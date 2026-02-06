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
    const $newStudentDataBtn = $('#new-student-data-btn'); // 新增學生資料按鈕
    const $showStudentDataListBtn = $('#show-student-data-list-btn'); // 顯示學生列表按鈕
    const $saveStudentDataBtn = $('#save-student-data-btn'); // 學生資料儲存按鈕
    const $uploadStudentDataFileBtn = $('#student-data-file-upload'); // 上傳學生檔案按鈕
    const $deleteStudentDataFileBtn = $('#delete-student-data-file'); // 刪除檔案按鈕

    // 模板
    const $studentDataModal = $('#student-data-modal'); // 學生資料編輯模板
    const $studentDataListModal = $('#student-data-list-modal'); // 學生列表模板
    const $imgModal = $('#img-modal'); // 顯示檔案模板

    // 欄位
    const $studentDataTitle = $('#student-data-modal-header'); // 學生資料模板的 Title
    const $studentDataListTitle = $('#student-data-list-modal-header'); // 學生列表模板的 Title
    const $uploadStudentDataFileArea = $('#upload-student-data-file-area'); // 上傳學生檔案欄位
    const $uploadedStudentDataFileArea = document.getElementById('uploaded-student-data-file-area'); // 擺放已上傳的學生檔案欄位
    const $imgModalBody= $('#img-modal-body'); // 顯示檔案的欄位

    // 學生資料欄位
    const $userId = $('#user-id');
    const $studentId = $('#student-id');
    const $name = $('#name');
    const $engName = $('#eng-name');
    const $gender = $('#gender');
    const $email = $('#email');
    const $systemId = $('#system-id');
    const $identity = $('#identity');
    const $birthday = $('#birthday');
    const $birthLocation = $('#birth-location');
    const $residentLocation = $('#resident-location');
    const $residentPhone = $('#resident-phone');
    const $residentAddress = $('#resident-address');
    const $moveResidentLocationYear = $('#move-resident-location-year');
    const $moveBeforeResidentLocation = $('#move-before-resident-location');
    const $residentId = $('#resident-id');
    const $residentPassportNo = $('#resident-passport-no');
    const $placeOriginProvince = $('#place-origin-province');
    const $placeOriginCountyCity = $('#place-origin-county-city');
    const $taiwanId = $('#taiwan-id');
    const $taiwanPassportNo = $('#taiwan-passport-no');
    const $taiwanPhone = $('#taiwan-phone');
    const $taiwanAddress = $('#taiwan-address');
    const $dadMomName = $('#dad-mom-name');
    const $dadMomEngName = $('#dad-mom-eng-name');
    const $dadMomBirthday = $('#dad-mom-birthday');
    const $momDadName = $('#mom-dad-name');
    const $momDadEngName = $('#mom-dad-eng-name');
    const $momDadBirthday = $('#mom-dad-birthday');
    const $twContactName = $('#tw-contact-name');
    const $twContactPhone = $('#tw-contact-phone');
    const $twContactAddress = $('#tw-contact-address');
    const $schoolLocation = $('#school-location');
    const $schoolName = $('#school-name');
    const $educationSystemDescription = $('#education-system-description');
    const $applyMedicineDentist = $('.apply-medicine-dentist');
    const $applyWay = $('.apply-way');
    const $studentMemo = $('#student-memo');

    let studentDataMode = null; // 記錄學生資料 modal 目前的狀態
    let _filterStudentList = []; // 學生搜尋列表
    let countryListArray = []; // // 目前國家列表有哪些
    let reportListArray = []; // 目前單招通報有哪些
    let studentListArray = []; // 目前學生列表有哪些
    let $uploadedStudentDataFiles = []; // 學生上傳檔案陣列
    let currentReportDataID = 0; // 當前單招通報資料ID
    let currentStudentDataID = 0; // 當前學生ID

    class studentDataList{
        constructor({
            report_id = 0,
            user_id = 0,
            student_id = null,
            system_id,
            identity,
            name = null,
            eng_name = null,
            gender,
            email = null,
            birthday = null,
            birth_location,
            resident_location,
            resident_phone = null,
            resident_address = null,
            move_resident_location_year= false,
            move_before_resident_location,
            resident_id = null,
            resident_passport_no = null,
            place_origin_province = null,
            place_origin_county_city = null,
            taiwan_id = null,
            taiwan_passport_no = null,
            taiwan_phone = null,
            taiwan_address = null,
            dad_mom_name = null,
            dad_mom_eng_name = null,
            dad_mom_birthday = null,
            mom_dad_name = null,
            mom_dad_eng_name = null,
            mom_dad_birthday = null,
            tw_contact_name = null,
            tw_contact_phone = null,
            tw_contact_address = null,
            school_location,
            school_name = null,
            education_system_description = null,
            apply_medicine_dentist,
            apply_way,
            student_memo = null
        }={}){
            this.report_id =report_id;
            this.user_id =user_id;
            this.student_id = student_id;
            this.system_id = system_id;
            this.identity = identity;
            this.name = name;
            this.eng_name = eng_name;
            this.gender = gender;
            this.email = email;
            this.birthday = birthday;
            this.birth_location = birth_location;
            this.resident_location = resident_location;
            this.resident_phone = resident_phone;
            this.resident_address = resident_address;
            this.move_resident_location_year = move_resident_location_year;
            this.move_before_resident_location = move_before_resident_location;
            this.resident_id = resident_id,
            this.resident_passport_no = resident_passport_no,
            this.place_origin_province = place_origin_province;
            this.place_origin_county_city = place_origin_county_city;
            this.taiwan_id = taiwan_id;
            this.taiwan_passport_no = taiwan_passport_no;
            this.taiwan_phone = taiwan_phone;
            this.taiwan_address = taiwan_address;
            this.dad_mom_name = dad_mom_name;
            this.dad_mom_eng_name = dad_mom_eng_name;
            this.dad_mom_birthday = dad_mom_birthday;
            this.mom_dad_name = mom_dad_name;
            this.mom_dad_eng_name = mom_dad_eng_name;
            this.mom_dad_birthday = mom_dad_birthday;
            this.tw_contact_name = tw_contact_name;
            this.tw_contact_phone = tw_contact_phone;
            this.tw_contact_address = tw_contact_address;
            this.school_location = school_location;
            this.school_name = school_name;
            this.education_system_description = education_system_description;
            this.apply_medicine_dentist = apply_medicine_dentist;
            this.apply_way = apply_way;
            this.student_memo = student_memo;
        }
    }

    // 事件轉換
    $newStudentDataBtn.on('click', _handleNewStudentDataModalShow); // 新增學生資料
    $showStudentDataListBtn.on('click', _handleShowStudentDataListModalShow); // 顯示學生列表
    $studentFilter.on('keyup', _handleStudentFilter); // 學生列表篩選
    $saveStudentDataBtn.on('click', false, _handleStudentDataSave); // 儲存學生資料
    $uploadStudentDataFileBtn.on('change', true, _handleStudentDataUploadFile); // 上傳學生資料檔案
    $deleteStudentDataFileBtn.on('click', _handleStudentDataDeleteFile); // 刪除學生資料檔案
    $('body').on('click', '.img-thumbnail', _handleStudentDataShowFile); // 顯示學生資料檔案

    // 模板監聽操作
    $imgModal.on('hidden.bs.modal', function(){
        $('body').addClass('modal-open');
        $studentDataModal.trigger('focus');
    });
    $studentDataModal.on('shown.bs.modal', function () {
        $('body').addClass('modal-open');
    });
    $studentDataModal.on('hidden.bs.modal', function () {
        if (studentDataMode === 'edit') {
            _handleShowStudentDataListModalShow();
        }
        studentDataMode = null;
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
                    _reportListTamplate(reportListArray, pagination.pageNumber);
                    const $newStudentDataBtn = $('.new-student-data-btn'); // 新增建立學生資料按鈕的觸發事件（開啟 Modal）
                    $newStudentDataBtn.on('click', _handleNewStudentDataModalShow);
                    const $showStudentDataListBtn = $('.show-student-data-list-btn'); // 學生資料列表觸發事件（開啟 Modal）
                    $showStudentDataListBtn.on('click', function () {
                        currentReportDataID = $(this).closest('tr').data('id'); // 獲取 data-id
                        reportDate = $(this).closest('tr').data('report-date');
                        _handleShowStudentDataListModalShow();
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
    function _reportListTamplate(reportDatas,page) {
        // 渲染 請求列表
        $reportList.html('');
        reportDatas.forEach(function (reportData, index) {
            const academicYear = reportData.academic_year;
            const phase = reportData.phase;
            const admissionYear = reportData.admission_year;
            const reportFrequency = reportData.report_frequency;
            const reportTitle = reportData.report_title;
            const reportAppliedDate = _formatDate(reportData.applied_at);
            const reportCompletedDate = _formatDate(reportData.completed_at);
            const reportReturnedDate = _formatDate(reportData.returned_at);
            let listHtml = '';
            let status = '';
            let buttonStatus = '';
            let buttonColor = '';
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

            listHtml = `<tr class="" data-id="${reportData.id}"  data-report-date="${reportData.applied_at}">`;
            listHtml += `<td>${index+1+((page-1)*10)}</td>`;
            listHtml += `<td>${academicYear}</td>`;
            listHtml += `<td>${phase}</td>`;
            listHtml += `<td>${admissionYear}</td>`;
            listHtml += `<td>${reportFrequency}</td>`;
            listHtml += `<td>${reportTitle}</td>`;
            if(reportAppliedDate) {
                if(reportCompletedDate) {
                    listHtml += `<td>通報已完成</td>`;
                } else {
                    listHtml += `<td>通報已送件</td>`;
                }
                listHtml += `
                        <td>
                            <div class="my-2">
                                <button class="btn btn-outline-info show-student-data-list-btn same-width-button" id="show-student-data-list-btn">
                                    <i class="fa fa-bars fa-fw" aria-hidden="true"></i>學生列表
                                </button>
                            </div>
                        </td>`;
            } else {
                if(reportReturnedDate) {
                    listHtml += `<td>通報退回</td>`;
                } else {
                    listHtml += `<td></td>`;
                }
                listHtml += `<td>
                        <div class="my-2"><button class="btn btn-outline-primary new-student-data-btn same-width-button" id="new-student-data-btn"><i class="fa fa-plus fa-fw" aria-hidden="true"></i>新增學生資料</button></div>
                        <div class="my-2"><button class="btn btn-outline-info show-student-data-list-btn same-width-button" id="show-student-data-list-btn"><i class="fa fa-bars fa-fw" aria-hidden="true"></i>學生列表</button></div></td>`;
            }
            listHtml += `</tr>`;
            $reportList.append(listHtml);
        });
        $.bootstrapSortable(true);
    }

    // 處理新增學生資料模板
    function _handleNewStudentDataModalShow() {
        // 顯示和關閉 modal
        $studentDataListModal.modal('hide');
        $studentDataModal.modal('show');

        // 欄位預設狀態
        studentDataMode = 'add';
        $uploadStudentDataFileArea.hide();
        $('#tab2-tab').show();
        $('#tab1-tab').html(`新增單一學生資料`);
        $studentId.attr('disabled',false);
        $name.attr('disabled',false);
        $engName.attr('disabled',false);
        $email.attr('disabled',false);
        $birthday.attr('disabled',false);
        $residentPhone.attr('disabled',false);
        $residentAddress.attr('disabled',false);
        $moveResidentLocationYear.attr('disabled',false);
        $residentId.attr('disabled',false);
        $residentPassportNo.attr('disabled',false);
        $placeOriginProvince.attr('disabled',false);
        $placeOriginCountyCity.attr('disabled',false);
        $taiwanId.attr('disabled',false);
        $taiwanPassportNo.attr('disabled',false);
        $taiwanPhone.attr('disabled',false);
        $taiwanAddress.attr('disabled',false);
        $dadMomName.attr('disabled',false);
        $dadMomEngName.attr('disabled',false);
        $dadMomBirthday.attr('disabled',false);
        $momDadName.attr('disabled',false);
        $momDadEngName.attr('disabled',false);
        $momDadBirthday.attr('disabled',false);
        $twContactName.attr('disabled',false);
        $twContactPhone.attr('disabled',false);
        $twContactAddress.attr('disabled',false);
        $schoolName.attr('disabled',false);
        $educationSystemDescription.attr('disabled',false);
        $studentMemo.attr('disabled',false);
        // currentReportID = '';
        // currentStudentDataID = '';
        $uploadedStudentDataFileArea.innerHTML = '';
        $userId.val('');
        $studentId.val('');
        $systemId.val('').selectpicker('refresh');
        $identity.val('').selectpicker('refresh');
        $name.val('');
        $engName.val('');
        $gender.val('');
        $email.val('');
        $birthday.val('');
        $birthLocation.val('');
        $residentLocation.val('');
        $residentPhone.val('');
        $residentAddress.val('');
        $moveResidentLocationYear.val('');
        $moveBeforeResidentLocation.val('');
        $residentId.val('');
        $residentPassportNo.val('');
        $placeOriginProvince.val('');
        $placeOriginCountyCity.val('');
        $taiwanId.val('');
        $taiwanPassportNo.val('');
        $taiwanPhone.val('');
        $taiwanAddress.val('');
        $dadMomName.val('');
        $dadMomEngName.val('');
        $dadMomBirthday.val('');
        $momDadName.val('');
        $momDadEngName.val('');
        $momDadBirthday.val('');
        $twContactName.val('');
        $twContactPhone.val('');
        $twContactAddress.val('');
        $schoolLocation.val('');
        $schoolName.val('');
        $educationSystemDescription.val('');
        // $("input[name=apply-medicine-dentist").prop('checked', false);
        $applyMedicineDentist.prop('checked', false);
        $applyWay.prop('checked', false);
        $studentMemo.val('');
        $saveStudentDataBtn.attr('disabled',false).show();
        $saveStudentDataBtn.html($saveStudentDataBtn.html().replace('儲存','新增'));
        $studentDataTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 新增學生資料</i>`);

        // $returnReason.hide();
        // $uploadFileArea.hide();

        // 日期相關欄位
        let Year = new Date().getFullYear();
        $birthday.datepicker({
            updateViewDate: true, // 會自動避免並修正直接輸入錯誤/無效的月/日，例：不是潤年的時候輸入2月29日，設true會自動跳下一天到3月1日
            autoclose: true, // 選完會自動關閉選擇器
            startView: 2, // 以個位數年份單位開始瀏覽
            maxViewMode: 3, // 最高以10年單位瀏覽年份
            immediateUpdates: true, // 只要選了其中一個項目，立即刷新欄位的年/月/日的數字
            defaultViewDate: {year: (Year-18)}, // 預設選項是 18歲
            startDate: '-121y', // 當前年份-121y
            endDate: '-9y' // 當前年份-9y
        });
        $dadMomBirthday.datepicker({
            updateViewDate: true,
            autoclose: true,
            startView: 2,
            maxViewMode: 3,
            immediateUpdates: true,
            defaultViewDate: {year: (Year-40)},
            startDate: '-121y',
            endDate: '-21y'
        });
        $momDadBirthday.datepicker({
            updateViewDate: true,
            autoclose: true,
            startView: 2,
            maxViewMode: 3,
            immediateUpdates: true,
            defaultViewDate: {year: (Year-40)},
            startDate: '-121y',
            endDate: '-21y'
        });

        openLoading();
        // 取得國家列表
        Student.getCountryList()
        .then((json) => {
            countryListArray = json;
            $birthLocation.selectpicker({title: '請選擇'});
            $residentLocation.selectpicker({title: '請選擇'});
            $moveBeforeResidentLocation.selectpicker({title: '請選擇'});
            $schoolLocation.selectpicker({title: '請選擇'});
            Object.entries(countryListArray).forEach(([key, value]) => {
                $birthLocation.append(`<option value="${key}">${value}</option>`);
                $residentLocation.append(`<option value="${key}">${value}</option>`);
                $moveBeforeResidentLocation.append(`<option value="${key}">${value}</option>`);
                $schoolLocation.append(`<option value="${key}">${value}</option>`);
            });
            $birthLocation.selectpicker('refresh');
            $residentLocation.selectpicker('refresh');
            $moveBeforeResidentLocation.selectpicker('refresh');
            $schoolLocation.selectpicker('refresh');
            $birthLocation.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
            $residentLocation.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
            $moveBeforeResidentLocation.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
            $schoolLocation.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
            stopLoading();
        });

        $gender.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
        $systemId.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
        $identity.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
    }

    // 處理學生列表模板
    function _handleShowStudentDataListModalShow() {
        // 顯示 modal
        $studentDataListModal.modal('show');

        // 欄位預設狀態
        $studentList.find('tbody').html('');
        $studentFilter.val('');
        $studentDataListTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 學生列表</i>`);

        openLoading();
        // 取得學生資料列表
        School.getIndependentAdmissionStudentList(currentReportDataID)
        .then((res) => {
            if(res.ok) { // 有資料則開始頁面初始化
                return res.json();
            } else {
                throw res;
            }
        }).then((json) => {
            //作分頁
            studentListArray=json;
            $studentListPaginationContainer.pagination({
                dataSource: studentListArray,
                pageSize: 10,
                callback: function(studentListArray) {
                    _studentListTamplate(studentListArray);
                    $editStudentDataBtn = $('.edit-student-data-btn'); // 修改學生資料編輯按鈕的觸發事件（開啟 Modal）
                    $editStudentDataBtn.on('click', function () {
                        currentStudentDataID = $(this).closest('tr').data('user-id'); // 獲取 data-userid
                        _handleEditStudentDataModalShow();
                    });

                }
            });
            stopLoading();
       }).catch((err) => {
            err.json && err.json().then((data) => {
                swal({title:data.messages[0], confirmButtonText:'確定', type:'warning'}).then(() => {
			    	location.reload();
			    });
            });
            stopLoading();
        });
    }

    // 渲染學生列表
    function _studentListTamplate(json){
        // 欄位預設狀態
        $studentList.find('tbody').html('');
        // 擺放學生列表資料
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

    // 處理編輯學生資料模板
    function _handleEditStudentDataModalShow() {
        // 記錄 modal 的狀態
        studentDataMode = 'edit';
        // 顯示 modal
        $studentDataListModal.modal('hide');
        $studentDataModal.modal('show');
        // 欄位預設狀態
        $saveStudentDataBtn.html($saveStudentDataBtn.html().replace('新增','儲存'));

        openLoading();
        // 取得國家列表
        Student.getCountryList()
            .then((json) => {
                countryListArray = json;
                $birthLocation.selectpicker({title: '請選擇'});
                $residentLocation.selectpicker({title: '請選擇'});
                $moveBeforeResidentLocation.selectpicker({title: '請選擇'});
                $schoolLocation.selectpicker({title: '請選擇'});
                Object.entries(countryListArray).forEach(([key, value]) => {
                    $birthLocation.append(`<option value="${key}">${value}</option>`);
                    $residentLocation.append(`<option value="${key}">${value}</option>`);
                    $moveBeforeResidentLocation.append(`<option value="${key}">${value}</option>`);
                    $schoolLocation.append(`<option value="${key}">${value}</option>`);
                });
                $birthLocation.selectpicker('refresh');
                $residentLocation.selectpicker('refresh');
                $moveBeforeResidentLocation.selectpicker('refresh');
                $schoolLocation.selectpicker('refresh');
                $birthLocation.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
                $residentLocation.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
                $moveBeforeResidentLocation.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
                $schoolLocation.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
                stopLoading();
            });
        // 呼叫擺放學生資料
        _setStudentData(currentReportDataID, currentStudentDataID, reportDate);
    }

    // 擺放學生資料
    function _setStudentData(reportId, userId, reportHadApplied) {
        // 欄位預設狀態
        $uploadStudentDataFileArea.show();
        $studentDataTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 編輯學生資料</i>`);
        $('#tab2-tab').hide();
        $('#tab1-tab').html(`編輯單一學生資料`);

        openLoading();
        // 取得學生資料
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
            $systemId.val(json.system_id).selectpicker('refresh');
            $identity.val(json.identity).selectpicker('refresh');
            $name.val(json.name);
            $engName.val(json.eng_name);
            $gender.val(json.gender).selectpicker('refresh');
            $email.val(json.email);
            $birthday.val(json.birthday);
            $birthLocation.val(json.birth_location).selectpicker('refresh');
            $residentLocation.val(json.resident_location).selectpicker('refresh');
            $residentPhone.val(json.resident_phone);
            $residentAddress.val(json.resident_address);
            $moveResidentLocationYear.val(json.move_resident_location_year);
            $moveBeforeResidentLocation.val(json.move_before_resident_location).selectpicker('refresh');
            $residentId.val(json.resident_id);
            $residentPassportNo.val(json.resident_passport_no);
            $placeOriginProvince.val(json.place_origin_province);
            $placeOriginCountyCity.val(json.place_origin_county_city);
            $taiwanId.val(json.taiwan_id);
            $taiwanPassportNo.val(json.taiwan_passport_no);
            $taiwanPhone.val(json.taiwan_phone);
            $taiwanAddress.val(json.taiwan_address);
            $dadMomName.val(json.dad_mom_name);
            $dadMomEngName.val(json.dad_mom_eng_name);
            $dadMomBirthday.val(json.dad_mom_birthday);
            $momDadName.val(json.mom_dad_name);
            $momDadEngName.val(json.mom_dad_eng_name);
            $momDadBirthday.val(json.mom_dad_birthday);
            $twContactName.val(json.tw_contact_name);
            $twContactPhone.val(json.tw_contact_phone);
            $twContactAddress.val(json.tw_contact_address);
            $schoolLocation.val(json.school_location).selectpicker('refresh');
            $schoolName.val(json.school_name);
            $educationSystemDescription.val(json.education_system_description);
            $("input[name=apply-medicine-dentist][value='" + json.apply_medicine_dentist + "']").prop("checked", true);
            // $applyMedicineDentist.val(json.apply_medicine_dentist).prop("checked", true);
            $("input[name=apply-way][value='" + json.apply_way + "']").prop("checked", true);
            // $applyWay.val(json.apply_way).prop("checked", true);
            $studentMemo.val(json.memo);
            if(reportHadApplied){ // 如果單招通報資料已送件
                // 欄位預設狀態
                $saveStudentDataBtn.attr('disabled',true).hide();
                $uploadStudentDataFileBtn.attr('disabled',true);
                $('.btn-upload').hide();
            }else{
                // 欄位預設狀態
                $saveStudentDataBtn.attr('disabled',false).show();
                $uploadStudentDataFileBtn.attr('disabled',false);
                $('.btn-upload').show();
            }
            $uploadedStudentDataFiles = json.files;
		}).then(()=>{
            _handleStudentDataRenderFile();
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

    // 處理學生資料儲存
    function _handleStudentDataSave(event) {
        // 建立要傳送的資料欄位
        let studentData = new studentDataList({
            report_id: currentReportDataID,
            user_id: $userId.val(),
            student_id: $studentId.val(),
            system_id: $systemId.val(),
            identity: $identity.val(),
            name: $name.val(),
            eng_name: $engName.val(),
            gender: $gender.val(),
            email: $email.val(),
            birthday: $birthday.val(),
            birth_location: $birthLocation.val(),
            resident_location: $residentLocation.val(),
            resident_phone: $residentPhone.val(),
            resident_address: $residentAddress.val(),
            move_resident_location_year: $moveResidentLocationYear.val(),
            move_before_resident_location: $moveBeforeResidentLocation.val(),
            resident_id: $residentId.val(),
            resident_passport_no: $residentPassportNo.val(),
            place_origin_province: $placeOriginProvince.val(),
            place_origin_county_city: $placeOriginCountyCity.val(),
            taiwan_id: $taiwanId.val(),
            taiwan_passport_no: $taiwanPassportNo.val(),
            taiwan_phone: $taiwanPhone.val(),
            taiwan_address: $taiwanAddress.val(),
            dad_mom_name: $dadMomName.val(),
            dad_mom_eng_name: $dadMomEngName.val(),
            dad_mom_birthday: $dadMomBirthday.val(),
            mom_dad_name: $momDadName.val(),
            mom_dad_eng_name: $momDadEngName.val(),
            mom_dad_birthday: $momDadBirthday.val(),
            tw_contact_name: $twContactName.val(),
            tw_contact_phone: $twContactPhone.val(),
            tw_contact_address: $twContactAddress.val(),
            school_location: $schoolLocation.val(),
            school_name: $schoolName.val(),
            education_system_description: $educationSystemDescription.val(),
            apply_medicine_dentist: $(".apply-medicine-dentist:checked").val(),
            apply_way: $(".apply-way:checked").val(),
            student_memo: $studentMemo.val(),
        });


        if (currentStudentDataID != '') { // 如果學生資料有系統編號，代表是儲存學生資料
            studentData.user_id = currentStudentDataID; // 加上 當前學生資料的系統編號 傳送
            studentData.applied = event.studentData; // 加上 是送件的判斷 傳送
        }

        openLoading();
        // 傳送資料欄位
        School.saveIndependentAdmissionStudentData(studentData)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            swal({title:json.messages[0], confirmButtonText:'確定', type:'success'}).then(() => {
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

    // 處理學生上傳檔案
    function _handleStudentDataUploadFile(event) {
        const fileList = this.files;
        // 沒有上傳檔案 直接return
		if(fileList.length <= 0){
			return;
		}
        // 將檔案放到 FormData class中 方便後續request傳送檔案
		let sendData = new FormData();

        for (let i = 0; i < fileList.length; i++) {
            //偵測是否超過8MB
            if(sizeConversion(fileList[i].size,8)){
                swal({title:`${fileList[i].name}檔案過大，檔案大小不能超過8MB`, confirmButtonText:'確定', type:'error'}).then(() => {
                    return;
                });
            }
            sendData.append('files[]', fileList[i]);
        }

        openLoading();
        // 上傳檔案
        School.uploadStudentDataFile(currentReportDataID, currentStudentDataID, sendData)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            $uploadedStudentDataFiles = json;
        })
        .then(()=>{
            _handleStudentDataRenderFile();
        })
        .then(()=>{
            swal({title:`上傳成功`, confirmButtonText:'確定', type:'success'}).then(() => {
                event.target.value = ''; // 重置 input
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

    // 處理學生檔案渲染
    function _handleStudentDataRenderFile() {
        // 檔案欄位各自的 HTML 累積字串
        let uploadedStudentDataAreaHtml = '';

        $uploadedStudentDataFiles.forEach((file) => {
            const fileType = _getFileType(file.split('.')[1]); // 取副檔名

            // 產生這個檔案的 HTML
            if(fileType === 'img'){
                uploadedStudentDataAreaHtml += `
                    <img
                        class="img-thumbnail"
                        src="${env.baseUrl}/independent-admission/student-report/file/${currentReportDataID}/${currentStudentDataID}/${file}"
                        data-toggle="modal"
                        data-filename="${file}"
						data-target=".img-modal"
                        data-filetype="img"
                        data-filelink="${env.baseUrl}/independent-admission/student-report/file/${currentReportDataID}/${currentStudentDataID}/${file}"
                    />
                `
            } else {
                uploadedStudentDataAreaHtml += `
					<div
						class="img-thumbnail non-img-file-thumbnail"
						data-toggle="modal"
						data-target=".img-modal"
						data-filelink="${env.baseUrl}/independent-admission/student-report/file/${currentReportDataID}/${currentStudentDataID}/${file}"
						data-filename="${file}"
                        data-filetype="${fileType}"
						data-icon="fa-file-${fileType}-o"
					>
						<i class="fa fa-file-${fileType}-o" data-filename="${file}" data-icon="fa-file-${fileType}-o" aria-hidden="true"></i>
					</div>
				`;
            }
        })

        // 區塊渲染出來（有檔案就有內容、沒檔案就是空字串）
        $uploadedStudentDataFileArea.innerHTML = uploadedStudentDataAreaHtml;

    }

    // 處理檔案打開顯示
    function _handleStudentDataShowFile(){
        // 取得檔案名字和類型
		const fileName = $(this).data('filename');
		const fileType = $(this).data('filetype');

		// 檔案欄位預設狀態
		$imgModalBody.html('');

		// 是圖用 img tag pdf用 embed tag
		if (fileType === 'img') {
			$imgModalBody.html(`
				<img
					src="${this.src}"
					class="img-fluid rounded img-ori"
				>
			`);
		} else {
			$imgModalBody.html(`
				<div style="margin: 0 auto">
					<embed src="${this.dataset.filelink}" width="550" height="800" type="application/pdf">
				</div>
			`);
		}

        // 刪除檔案按鈕加上檔案名字和類型
        $deleteStudentDataFileBtn.attr({
            'filetype': fileType,
            'filename': fileName,
         });

    }

    // 處理檔案刪除
    function _handleStudentDataDeleteFile() {
        // currentStudentDataID = $userId.val();
        // 取得檔案名字
        let fileName = $deleteStudentDataFileBtn.attr('filename');
        // 跳出提示詢問
        swal({
			title: '確定要刪除此檔案？',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#5cb85c',
			cancelButtonColor: '#dc3454',
			confirmButtonText: '確定',
			cancelButtonText: '取消',
		})
		.then((result)	=> {
            if(result){
                openLoading();
                // 刪除檔案
                School.deleteStudentDataFile(currentReportDataID,currentStudentDataID,fileName)
                .then((res) => {
                    if(res.ok) {
                        return res.json();
                    } else {
                        throw res;
                    }
                })
                .then((json) => {
                    $uploadedStudentDataFiles = json;
                })
                .then(()=>{
                    _handleStudentDataRenderFile();
                })
                .then(()=>{
                    $imgModal.modal('hide');
                    swal({title:`刪除成功`, confirmButtonText:'確定', type:'success'}).then(() => {
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
        });
    }

    // 計算檔案大小是否超過限制大小
	function sizeConversion(size,limit) {
		let maxSize = limit*1024*1024;

		return size >=maxSize;
	}

    // 副檔名與檔案型態對應（回傳值須符合 font-awesome 規範）
	function _getFileType(fileNameExtension = '') {
		switch (fileNameExtension) {
			case 'doc':
			case 'docx':
				return 'word';

			case 'mp3':
				return 'audio';

			case 'mp4':
			case 'avi':
				return 'video';

			case 'pdf':
				return 'pdf';

			default:
				return 'img';
		}
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
        _filterStudentList = studentListArray.filter(function (obj) {
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