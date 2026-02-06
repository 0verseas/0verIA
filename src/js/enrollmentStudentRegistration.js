(()=>{
    // 分頁器
    const $paginationContainer = $('#pagination-container'); // 單招通報列表分頁器
    const $studentListPaginationContainer = $('#student-list-pagination-container'); // 學生列表分頁區域

    // 列表
    const $reportList = $('#report-list') // 單招通報列表
    const $studentList = $('#student-list'); // 學生列表

    // 搜尋欄
    const $studentFilter = $('#student-filter'); // 學生搜尋欄

    // 按鈕
    const $showStudentDataListBtn = $('#show-student-data-list-btn'); // 顯示學生列表按鈕
    const $saveStudentDataBtn = $('#save-student-data-btn'); // // 新增學生資料儲存按鈕

    // 模板
    const $studentDataModal = $('#student-data-modal'); // 學生資料編輯模板
    const $studentDataListModal = $('#student-data-list-modal'); // 學生列表模板

    // 欄位
    const $studentDataTitle = $('#student-data-modal-header'); // 學生資料模板的Title
    const $studentDataListTitle = $('#student-data-list-modal-header'); // 學生列表模板的Title

    // 學生資料欄位
    const $userId = $('#user-id');
    const $studentId = $('#student-id');
    const $name = $('#name');
    const $identity = $('#identity');
    const $admission_decision = $('#admission-decision');
    const $admitted_school = $('#admitted-school');
    const $admitted_department = $('#admitted-department');
    const $admission_registration_result = $('#admission-registration-result');

    let reportId = '';
    let _filterStudentList = [];
    let reportListArray = []; // 目前請求有哪些
    let studentAllList = []; // 目前學生列表有哪些
    let currentStudentDataID = 0; // 當前學生ID

    class studentDataList{
        constructor({
            report_id = 0,
            user_id = null,
            admission_registration_result = 0
        }={}){
            this.report_id = report_id;
            this.user_id = user_id;
            this.admission_registration_result = admission_registration_result;
        }
    }

    // 事件轉換
    $showStudentDataListBtn.on('click', _handleShowStudentDataListModalShow); // 顯示學生列表
    $studentFilter.on('keyup', _handleStudentFilter); // 學生列表篩選
    $saveStudentDataBtn.on('click', false, _handleStudentRegistrationDataSave); // 儲存學生資料

    // 模板監聽操作
    $studentDataModal.on('shown.bs.modal', function () {
        $('body').addClass('modal-open');
    });

    $studentDataModal.on('hidden.bs.modal', function () {
        _handleShowStudentDataListModalShow();
    });
    $('.modal').on('hide.bs.modal', function () {
        if (document.activeElement === this || this.contains(document.activeElement)) {
            document.activeElement.blur();
        }
    });

    init();

    async function init(){
        let res = await User.isLogin();
        if(res == true) {
            _setReportListData();
        }
    }

    // 擺放單招通報列表資料
    function _setReportListData() {
        openLoading();
        School.getIndependentAdmissionReportList()
        .then((res) => {
			if(res.ok) {
				return res.json();
			} else {
				throw res;
			}
		})
        .then((json) => {
            reportListArray = json;
            // 進行單招通報列表分頁初始化渲染工作
            $paginationContainer.pagination({
                dataSource: reportListArray,
                pageSize: 10,
                callback: function(reportListArray,pagination) {
                    School.getIndependentAdmissionEnrollmentList()
                    .then((res) => {
		            	if(res.ok) {
		            		return res.json();
		            	} else {
		            		throw res;
		            	}
		            })
                    .then((json) => {
                        enrollmentListArray = json;
                        _reportListTamplate(reportListArray, enrollmentListArray, pagination.pageNumber);
                        const $showStudentDataListBtn = $('.show-student-data-list-btn'); // 學生資料列表觸發事件（開啟 Modal）
                        $showStudentDataListBtn.on('click', function () {
                            reportId = $(this).closest('tr').data('id'); // 獲取 data-id
                            enrollmentStatus = $(this).closest('tr').data('enrollment-status'); // 獲取 data-enrollment-status
                            _handleShowStudentDataListModalShow();
                        });
                    });
                }
            });
            stopLoading();
		}).catch((err) => {
            stopLoading();
			err.json && err.json().then((data) => {
				console.error(data);
                swal({title:data.messages[0], confirmButtonText:'確定', type:'error'}).then(() => {
                    location.reload();
				});
			});
		});
    }

    // 渲染單招通報列表
    function _reportListTamplate(reportDatas,enrollmentDatas,page) {
        // 渲染 單招通報資料列表
        $reportList.html('');
        reportDatas.forEach(function (reportData, index) {
            const reportId = reportData.id;
            const academicYear = reportData.academic_year;
            const phase = reportData.phase;
            const admissionYear = reportData.admission_year;
            const reportFrequency = reportData.report_frequency;
            const reportTitle = reportData.report_title;

            let listHtml = '';
            let status = '';
            let buttonStatus = '';
            let buttonColor = '';
            let enrollmetHtml = '';
            if(reportData.applied_at != null){
                if (reportData.completed_at == null) {
                    status  = '<i class="fa fa-hourglass-half fa-fw" aria-hidden="true"></i> 等候處理';
                    buttonColor = 'btn-warning';
                } else {
                    status  = '<i class="fa fa-check fa-fw" aria-hidden="true"></i> 處理完畢';
                    buttonColor = 'btn-success';
                }
                buttonStatus = 'disabled';
            } else {
                if (reportData.returned_at != null) {
                    status = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> 退回待處理';
                    buttonColor = 'btn-danger';
                } else {
                    status = '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i> 點擊編輯';
                    buttonColor = 'btn-outline-info';
                }
            }
            const enrollmentData = enrollmentDatas.find(function (enrollmentData) {
                return enrollmentData.id == reportId;
            });

            if (enrollmentData) { // 有建立過單招錄取資料
                const enrollmentAppliedDate = _formatDate(enrollmentData.applied_at);
                const enrollmentCompletedDate = _formatDate(enrollmentData.completed_at);
                const enrollmentReturnedDate = _formatDate(enrollmentData.returned_at);
                if (enrollmentAppliedDate) {
                    if(enrollmentCompletedDate) {
                        enrollmetHtml = `錄取資料已完成`;
                    } else {
                        enrollmetHtml = `錄取資料已送出`;
                    }
                } else {
                    if (enrollmentReturnedDate) {
                        enrollmetHtml = `錄取資料退回`;
                    } else {
                        enrollmetHtml = ``;
                    }
                }
            }

            listHtml = `<tr class="" data-id="${reportData.id}" data-enrollment-status="${enrollmetHtml}">`;
            listHtml += `<td>${index+1+((page-1)*10)}</td>`;
            listHtml += `<td>${academicYear}</td>`;
            listHtml += `<td>${phase}</td>`;
            listHtml += `<td>${admissionYear}</td>`;
            listHtml += `<td>${reportFrequency}</td>`;
            listHtml += `<td>${reportTitle}</td>`;
            listHtml += `<td>${enrollmetHtml}</td>`;
            listHtml += `<td>
                        <div class="my-2"><button class="btn btn-outline-info show-student-data-list-btn same-width-button" id="show-student-data-list-btn"><i class="fa fa-bars fa-fw" aria-hidden="true"></i>學生列表</button></div></td>`;
            listHtml += `</tr>`;
            $reportList.append(listHtml);
        });
    }

    // 處理編輯學生資料模板
    function _handleEditStudentDataModalShow() {
        // 顯示 modal
        $studentDataListModal.modal('hide');
        $studentDataModal.modal('show');
        // 按鈕和欄位預設狀態
        $saveStudentDataBtn.html($saveStudentDataBtn.html().replace('新增','儲存'));

        // 呼叫渲染學生資料事件
        _setStudentData(reportId, currentStudentDataID);
    }

    // 擺放學生資料
    function _setStudentData(reportId, userId) {
        // 欄位預設狀態
        $studentDataTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 編輯學生資料</i>`);
        // $('#tab2-tab').hide(); // TODO: 上傳學生資料
        // $('#tab1-tab').html(`編輯單一學生資料`);

        openLoading();
        School.getIndependentAdmissionStudentData(reportId,userId)
        .then((res) => {
			if(res.ok) {
				return res.json();
			} else {
				throw res;
			}
		})
        .then(async (json) => {
            $userId.val(json.user_id);
            $studentId.val(json.overseas_student_id);
            $name.val(json.name);
            $identity.val(json.identity).selectpicker('refresh').parent().find('button').removeClass('btn-light').addClass('btn-grey');
            $admission_decision.val(json.admission_decision).selectpicker('refresh').parent().find('button').removeClass('btn-light').addClass('btn-grey');
            $admitted_school.val(json.admitted_school);
            $admitted_department.val(json.admitted_department);
            $admission_registration_result.val(json.admission_registration_result).prop('disabled', false).selectpicker('refresh').parent().find('button').removeClass('btn-light').addClass('btn-white');
            stopLoading();
        })
		.catch((err) => {
            // console.log(err);
            stopLoading();
			err.json && err.json().then((data) => {
				console.error(data);
                swal({title:data.messages[0], confirmButtonText:'確定', type:'error'}).then(() => {
                    location.reload();
				});
			});
		});

    }

    // 處理學生列表模板
    function _handleShowStudentDataListModalShow() {
        // 顯示 modal
        $studentDataListModal.modal('show');
        // 欄位預設狀態
        $studentList.find('tbody').html('');
        $studentDataListTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 學生列表</i>`);
        $studentFilter.val('');

        if (enrollmentStatus != '錄取資料已完成') { // 還沒送件不能操作後續
            swal({title:"請先等待錄取資料完成。", confirmButtonText:'確定', type:'error', allowOutsideClick: false, allowEscapeKey: false}).then(() => {
				location.reload();
			});
        }

        openLoading();
        // 取得已錄取學生資料列表
        School.getIndependentAdmissionEnrollmentStudentList(reportId)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        }).then((json) => {
            // 渲染已錄取的學生列表
            studentAllList=json;
            $studentListPaginationContainer.pagination({
                dataSource: studentAllList,
                pageSize: 10,
                callback: function(studentAllList, pagination) {
                    _studentListTamplate(studentAllList, pagination.pageNumber);
                    $editStudentDataBtn = $('.edit-student-data-btn'); // 編輯已錄取的學生資料編輯按鈕的觸發事件（開啟 Modal）
                    $editStudentDataBtn.on('click', function () {
                        currentStudentDataID = $(this).closest('tr').data('user-id'); // 獲取 data-user-id
                        _handleEditStudentDataModalShow();
                    });
                }
            });
            stopLoading();
        }).catch((err) => {
            err.json && err.json().then((data) => {
                swal({title:data.messages[0], confirmButtonText:'確定', type:'warning'});
            });
            stopLoading();
        });
    }

    // 渲染已錄取的學生列表
    function _studentListTamplate(json){
        // 欄位預設狀態
        $studentList.find('tbody').html('');
        // 擺放已錄取的學生列表資料
        json.forEach(function (value) {
            const identity = ['港澳生', '港澳具外國國籍之華裔學生', '海外僑生'];

            const system = ['學士班', '港二技', '碩士班', '博士班', '轉學生'];

            var systemName = '';
            var identityName = '';
            var genderName = '';
            let studentName = encodeHtmlCharacters(value.name);
            let studentEngName = encodeHtmlCharacters(value.eng_name);

            if (value) {
                if (value.system_id) {
                    systemName = system[value.system_id - 1];
                }

                if (value.identity) {
                    identityName = identity[value.identity - 1];
                }

                if (value.gender === 'M') {
                    genderName = '男';
                } else if (value.gender === 'F') {
                    genderName = '女';
                }
            }

            // 渲染列表
            $studentList
                .find('tbody')
                .append(`
                        <tr class="edit-student-data-btn" data-user-id="${value.user_id}">
                            <td>
                                <span><i class="fa fa-pencil" aria-hidden="true"></i></span>
                            </td>
                            <td>${(value.user_id)}</td>
                            <td>${value.overseas_student_id || ""}</td>
                            <td>${studentName} &nbsp;&nbsp;&nbsp;&nbsp; ${studentEngName}</td>
                            <td>${genderName}</td>
                            <td>${value.email}</td>
                            <td>${systemName}</td>
                            <td>${identityName}</td>
                        </tr>`);

        });
        $.bootstrapSortable(true); // 啟用學生列表 title 排序功能
    }

    // 處理學生報到資料儲存
    function _handleStudentRegistrationDataSave(event) {
        // 建立要傳送的資料欄位
        let studentData = new studentDataList({
            report_id: reportId,
            user_id: $userId.val(),
            admission_registration_result: $admission_registration_result.val()
        });

        openLoading();
        // 傳送資料欄位
        School.saveIndependentAdmissionEnrollmentStudentRegistrationData(studentData)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            swal({title:json.messages[0], confirmButtonText:'確定', type:'success'}).then(() => {
                $studentDataModal.modal('hide');
            });
            stopLoading();
        })
        .catch((err) => {
            err.json && err.json().then((data) => {
                console.error(data);
                swal({title:data.messages[0], confirmButtonText:'確定', type:'error'});
            });
            stopLoading();
        });
    }

    // 轉換一些敏感字元避免 XSS
    function encodeHtmlCharacters(bareString) {
        if (bareString === null) return '';
        return bareString.replace(/&/g, "&amp;")  // 轉換 &
            .replace(/</g, "&lt;").replace(/>/g, "&gt;")  // 轉換 < 及 >
            .replace(/'/g, "&apos;").replace(/"/g, "&quot;")  // 轉換英文的單雙引號
            .replace(/ /g, " &nbsp;")
            ;
    }

    // 轉換年月日和時間顯示
    function _formatDate(date){
        if (date == null) {
            date = "";

            return date;
        } else {
            let format_date = new Date(date);
            let year = format_date.getFullYear()+'';
            let month = (format_date.getMonth()+1)+'';
            let day = format_date.getDate()+'';
            let hour = format_date.getHours()+'';
            let minute = format_date.getMinutes()+'';
            let second = format_date.getSeconds()+'';
            month = month.padStart(2, 0);
            day = day.padStart(2, 0);
            hour = hour.padStart(2, 0);
            minute = minute.padStart(2, 0);
            second = second.padStart(2, 0);

            return year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
        }
    }

    // 學生列表篩選搜尋欄
    function _handleStudentFilter() { // 搜尋過濾列表
        const filter = $studentFilter.val().toUpperCase();

        // 搜尋 報名序號、姓名、email、僑編
        _filterStudentList = $studentAllList.filter(function (obj) {
            return ( obj.user_id.toString().toUpperCase().indexOf(filter) > -1 ||
                obj.name.toUpperCase().indexOf(filter) > -1 ||
                obj.eng_name.toUpperCase().indexOf(filter) > -1 ||
                obj.email.toUpperCase().indexOf(filter) > -1  ||
                obj.overseas_student_id.toUpperCase().indexOf(filter) > -1);
        });

        // 沒有搜尋到資料
        if (_filterStudentList.length === 0) {
            $studentList
                .find('tbody')
                .html(`
                        <tr>
				<td class="text-center" colspan="2">查無資料。</td>
				</tr>`);
        }
        else{
            $paginationContainer.pagination({
                dataSource: _filterStudentList,
                pageSize: 20,
                callback: function(json) {
                    _studentListTamplate(json);
                }
            });
        }

        $.bootstrapSortable(true); // 啟用列表排序功能
    }

})();