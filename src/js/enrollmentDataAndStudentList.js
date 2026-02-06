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
    const $newEnrollmentDataBtn = $('#new-enrollment-data-btn'); // 新增單招錄取資料按鈕
    const $saveEnrollmentDataBtn = $('#save-enrollment-data-btn'); // 新增單招錄取資料儲存按鈕
    const $applyEnrollmentDataBtn = $('#apply-enrollment-data-btn'); // 發送按鈕
    const $deleteEnrollmentDataBtn = $('#delete-enrollment-data-btn'); // 刪除按鈕
    const $showStudentDataListBtn = $('#show-student-data-list-btn'); // 顯示學生列表按鈕
    const $saveStudentDataBtn = $('#save-student-data-btn'); // 學生資料儲存按鈕
    const $uploadMinistryOfEducationEligibilityFileBtn = $('#upload-ministry-of-education-eligibility-file-btn'); // 上傳教育部資格審查公文掃描檔按鈕
    const $uploadOCACEligibilityFileBtn = $('#upload-ocac-eligibility-file-btn'); // 上傳僑委會資格審查公文掃描檔按鈕
    const $uploadEnrollmentAnnouncementFileBtn = $('#upload-enrollment-announcement-file-btn'); // 上傳錄取公告掃描檔按鈕
    const $deleteEnrollmentDataFileBtn = $('#delete-enrollment-data-file-btn'); // 刪除檔案按鈕

    // 模板
    const $studentDataModal = $('#student-data-modal'); // 學生資料編輯模板
    const $enrollmentDataModal = $('#enrollment-data-modal'); // 建立單招錄取資料編輯模板
    const $studentDataListModal = $('#student-data-list-modal'); // 學生列表模板
    const $imgModal = $('#img-modal'); // 顯示檔案模板

    // 欄位
    const $studentDataTitle = $('#student-data-modal-header'); // 學生資料模板的 Title
    const $studentDataListTitle = $('#student-data-list-modal-header'); // 學生列表模板的 Title
    const $enrollmentDataTitle = $('#enrollment-data-modal-header'); // 建立單招錄取資料模板的 Title
    const $uploadMinistryOfEducationEligibilityFileArea = $('#upload-ministry-of-education-eligibility-file-area'); // 上傳教育部資格審查公文檔案欄位
    const $uploadOCACEligibilityFileArea = $('#upload-ocac-eligibility-file-area'); // 上傳僑委會資格審查公文檔案欄位
    const $uploadEnrollmentAnnouncementFileArea = $('#upload-enrollment-announcement-file-area'); // 上傳錄取公告檔案欄位
    const $uploadedMinistryOfEducationEligibilityFileArea = document.getElementById('uploaded-ministry-of-education-eligibility-file-area'); // 擺放已上傳教育部資格審查公文檔案欄位
    const $uploadedOCACEligibilityFileArea = document.getElementById('uploaded-ocac-eligibility-file-area'); // 擺放已上傳僑委會資格審查公文檔案欄位
    const $uploadedEnrollmentAnnouncementFileArea = document.getElementById('uploaded-enrollment-announcement-file-area'); // 擺放已上傳錄取公告檔案欄位
    const $imgModalBody= $('#img-modal-body'); // 顯示檔案的欄位

    // 單招錄取資料欄位
    const $ministryOfEducationEligibilityApprovalDate = $('#ministry-of-education-eligibility-approval-date');
    const $ministryOfEducationEligibilityApprovalDocNumber = $('#ministry-of-education-eligibility-approval-doc-number');
    const $ocacEligibilityApprovalDate = $('#ocac-eligibility-approval-date');
    const $ocacEligibilityApprovalDocNumber = $('#ocac-eligibility-approval-doc-number');
    const $enrollmentAnnouncementDate = $('#enrollment-announcement-date');
    const $enrollmentAnnouncementDocNumber = $('#enrollment-announcement-doc-number');

    // 學生資料欄位
    const $user_id = $('#user-id');
    const $student_id = $('#student-id');
    const $name = $('#name');
    const $identity = $('#identity');
    const $report_school = $('#report-school');
    const $qualification_approval_date_and_document_number = $('#qualification-verified-approval-date-and-number');
    const $qualification_eligibility_status = $('#qualification-eligibility-status');
    const $admission_decision = $('#admission-decision');
    const $admission_list_date_and_document_number = $('#admission-list-date-and-document-number');
    const $admitted_school = $('#admitted-school');
    const $admitted_department = $('#admitted-department');


    let _filterStudentList = []; // 學生搜尋列表
    let reportListArray = []; // 目前單招通報有哪些
    let enrollmentListArray = []; // 目前單招錄取資料有哪些
    let studentAllList = []; // 學生列表
    let $uploadedEnrollmentDataFiles = ''; // 上傳單招錄取資料檔案陣列
    let currentEnrollmentDataFileID = ''; // 當前單招錄取資料檔案ID
    let currentReportDataID = 0; // 當前單招通報資料ID
    let currentStudentDataID = 0; // 當前學生ID
    let currentEnrollmentDataID = 0; // 當前單招錄取資料ID


    class studentDataList{
        constructor({
            id = 0,
            report_id = 0,
            user_id = null,
            identity,
            report_school = null,
            qualification_approval_date_and_document_number = null,
            qualification_eligibility_status = null,
            admission_decision,
            admission_list_date_and_document_number = null,
            admitted_school = null,
            admitted_department = null
        }={}){
            this.id = id;
            this.report_id = report_id;
            this.user_id = user_id;
            this.identity = identity;
            this.report_school = report_school;
            this.qualification_approval_date_and_document_number = qualification_approval_date_and_document_number;
            this.qualification_eligibility_status = qualification_eligibility_status;
            this.admission_decision = admission_decision;
            this.admission_list_date_and_document_number = admission_list_date_and_document_number;
            this.admitted_school = admitted_school;
            this.admitted_department = admitted_department;
        }
    }

    class enrollmentDataList{
        constructor({
            id = 0,
            report_id = 0,
            applied = false,
            ministry_of_education_eligibility_approval_date = null,
            ministry_of_education_eligibility_approval_doc_number = null,
            ocac_eligibility_approval_date = null,
            ocac_approval_doc_number = null,
            enrollment_announcement_eligibility_approval_date = null,
            enrollment_announcement_eligibility_approval_doc_number = null
        }={}){
            this.id = id;
            this.report_id = report_id;
            this.applied = applied;
            this.ministry_of_education_eligibility_approval_date = ministry_of_education_eligibility_approval_date;
            this.ministry_of_education_eligibility_approval_doc_number = ministry_of_education_eligibility_approval_doc_number;
            this.ocac_eligibility_approval_date = ocac_eligibility_approval_date;
            this.ocac_approval_doc_number = ocac_approval_doc_number;
            this.enrollment_announcement_eligibility_approval_date = enrollment_announcement_eligibility_approval_date;
            this.enrollment_announcement_eligibility_approval_doc_number = enrollment_announcement_eligibility_approval_doc_number
        }
    }

    // 事件轉換
    $newEnrollmentDataBtn.on('click', _handleNewEnrollmentDataModalShow); // 新增單招錄取資料
    $showStudentDataListBtn.on('click', _handleShowStudentDataListModalShow); // 顯示學生列表
    $studentFilter.on('keyup', _handleStudentFilter); // 學生列表篩選
    $saveEnrollmentDataBtn.on('click', false, _handleEnrollmentDataSave); // 儲存單招錄取資料
    $applyEnrollmentDataBtn.on('click', true, _handleEnrollmentDataSave); // 送件單招錄取資料
    $deleteEnrollmentDataBtn.on('click', _handleEnrollmentDataDelete); // 刪除單招錄取資料
    $saveStudentDataBtn.on('click', _handleStudentDataSave); // 儲存學生資料
    $uploadMinistryOfEducationEligibilityFileBtn.on('change', true, _handleEnrollmentDataUploadFile); // 上傳教育部資格審查公文檔案
    $uploadOCACEligibilityFileBtn.on('change', true, _handleEnrollmentDataUploadFile); // 上傳僑委會資格審查公文檔案
    $uploadEnrollmentAnnouncementFileBtn.on('change', true, _handleEnrollmentDataUploadFile); // 上傳錄取公告檔案
    $deleteEnrollmentDataFileBtn.on('click', _handleEnrollmentDataDeleteFile); // 刪除單招錄取資料檔案
    $('body').on('click', '.img-thumbnail', _handleEnrollmentDataShowFile); // 顯示單招錄取資料檔案

    // 模板監聽操作
    $imgModal.on('hidden.bs.modal', function(){
        $('body').addClass('modal-open');
    });
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
                        const $newEnrollmentDataBtn = $('.new-enrollment-data-btn'); // 新增建立單招錄取資料按鈕的觸發事件（開啟 Modal）
                        $newEnrollmentDataBtn.on('click', function () {
                            currentReportDataID = $(this).closest('tr').data('id'); // 獲取 data-id
                            reportHadApplied = $(this).closest('tr').data('report-applied-date'); // 獲取 data-report-applied-date
                            _handleNewEnrollmentDataModalShow();
                        });
                        const $editEnrollmentDataBtn = $('.edit-enrollment-data-btn'); // 編輯建立單招錄取資料按鈕的觸發事件（開啟 Modal）
                        $editEnrollmentDataBtn.on('click', function () {
                            currentReportDataID = $(this).closest('tr').data('id'); // 獲取 data-id
                            currentEnrollmentDataID = $(this).data('id'); // 獲取 data-id
                            _handleEditEnrollmentDataModalShow();
                        });
                        const $showStudentDataListBtn = $('.show-student-data-list-btn'); // 學生資料列表觸發事件（開啟 Modal）
                        $showStudentDataListBtn.on('click', function () {
                            currentReportDataID = $(this).closest('tr').data('id'); // 獲取 data-id
                            enrollmentHadApplied = $(this).closest('tr').data('enrollment-applied-date'); // 獲取 data-enrollment-applied-date
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
            const reportAppliedDate = _formatDate(reportData.applied_at);
            const reportCompletedDate = _formatDate(reportData.completed_at);
            const reportReturnedDate = _formatDate(reportData.returned_at);

            const enrollmentData = enrollmentDatas.find(function (enrollmentData) {
                return enrollmentData.report_id == reportId;
            });

            let listHtml = '';
            let statusHtml;
            let buttonColor   = 'btn-outline-primary';
            let buttonStatus  = ''; // disabled 用
            let btnClass      = 'new-enrollment-data-btn';
            let btnId         = 'new-enrollment-data-btn';
            let dataAttr      = `data-reportid="${reportId}"`;
            let appliedDateHtml = "";

            if (enrollmentData) { // 有建立過單招錄取資料
                dataAttr     += ` data-id="${enrollmentData.id}"`;
                btnClass      = 'edit-enrollment-data-btn';
                btnId         = 'btn-edit-enrollment-data';


                if (enrollmentData.applied_at != null) {
                    const enrollmentAppliedDate = _formatDate(enrollmentData.applied_at);
                    appliedDateHtml += `${enrollmentAppliedDate}`;
                    if (enrollmentData.completed_at == null) {
                        statusHtml   = '<i class="fa fa-hourglass-half fa-fw" aria-hidden="true"></i> 等候處理';
                        buttonColor  = 'btn-warning';
                    } else {
                        statusHtml   = '<i class="fa fa-check fa-fw" aria-hidden="true"></i> 處理完畢';
                        buttonColor  = 'btn-success';
                    }
                    // buttonStatus = 'disabled';
                } else {

                    if (enrollmentData.returned_at != null) {
                        statusHtml  = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> 退回待處理';
                        buttonColor = 'btn-danger';
                    } else {
                        statusHtml  = '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i> 點擊編輯';
                        buttonColor = 'btn-outline-info';
                    }
                }
            } else { // 完全沒有 enrollmentData ，顯示「建立單招錄取資料」
                statusHtml = '<i class="fa fa-plus fa-fw" aria-hidden="true"></i> 建立單招錄取資料';
                buttonColor = 'btn-outline-primary';
            }

            listHtml = `<tr class="" data-id="${reportData.id}" data-enrollment-applied-date="${appliedDateHtml}" data-report-applied-date="${reportData.applied_at}">`;
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
            } else {
                if(reportReturnedDate) {
                    listHtml += `<td>通報退回</td>`;
                } else {
                    listHtml += `<td></td>`;
                }
            }
            listHtml += `<td>${appliedDateHtml}</td>`;


            // 擺放按鈕
            listHtml += `<td>
                            <div class="my-2">
                                <button class="btn ${buttonColor} ${btnClass} same-width-button"
                                        ${dataAttr}
                                        id="${btnId}" ${buttonStatus}>${statusHtml}</button>
                            </div>
                            <div class="my-2">
                                <button class="btn btn-outline-info show-student-data-list-btn same-width-button"
                                        id="show-student-data-list-btn">
                                    <i class="fa fa-bars fa-fw" aria-hidden="true"></i>學生列表
                                </button>
                            </div>
                         </td>`;

            listHtml += `</tr>`;
            $reportList.append(listHtml);
        });
        $.bootstrapSortable(true); // 啟用單招通報列表 title 排序功能
    }

    // 處理建立單招錄取資料模板
    function _handleNewEnrollmentDataModalShow() {
        // 顯示 modal
        $enrollmentDataModal.modal();
        // 檢查單招通報是否送件
        if (!reportHadApplied) { // 還沒送件不能建立單招錄取資料
            swal({title:"請先送出通報請求。<br \>將返回單招通報資料頁面。", confirmButtonText:'確定', type:'error'}).then(() => {
				location.replace('./report.html');
			});
        }
        // 按鈕和欄位預設狀態
        $uploadMinistryOfEducationEligibilityFileArea.hide();
        $uploadOCACEligibilityFileArea.hide();
        $uploadEnrollmentAnnouncementFileArea.hide();
        $ministryOfEducationEligibilityApprovalDate.attr('disabled',false);
        $ocacEligibilityApprovalDate.attr('disabled',false);
        $enrollmentAnnouncementDate.attr('disabled',false);
        $saveEnrollmentDataBtn.attr('disabled',false).show();
        $applyEnrollmentDataBtn.attr('disabled',false).hide();
        $deleteEnrollmentDataBtn.attr('disabled',false).hide();
        $ministryOfEducationEligibilityApprovalDate.val('');
        $ocacEligibilityApprovalDate.val('');
        $enrollmentAnnouncementDate.val('');
        $ministryOfEducationEligibilityApprovalDocNumber.val('');
        $ocacEligibilityApprovalDocNumber.val('');
        $enrollmentAnnouncementDocNumber.val('');
        $uploadedMinistryOfEducationEligibilityFileArea.innerHTML = '';
        $uploadedOCACEligibilityFileArea.innerHTML = '';
        $uploadedEnrollmentAnnouncementFileArea.innerHTML = '';
        $saveEnrollmentDataBtn.html($saveEnrollmentDataBtn.html().replace('儲存資料','建立資料'));
        $enrollmentDataTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 建立單招錄取資料</i>`);
        // $returnReason.hide();

        // 日期相關欄位 TODO：應該要設定年份在今年開始選，前年或更早不能被選
        let Year = new Date().getFullYear();
        $ministryOfEducationEligibilityApprovalDate.datepicker({
            updateViewDate: true, // 會自動避免並修正直接輸入錯誤/無效的月/日，例：不是潤年的時候輸入2月29日，設true會自動跳下一天到3月1日
            autoclose: true, // 選完會自動關閉選擇器
            startView: 2, // 以個位數年份單位開始瀏覽
            maxViewMode: 3, // 最高以10年單位瀏覽年份
            immediateUpdates: true, // 只要選了其中一個項目，立即刷新欄位的年/月/日的數字
            defaultViewDate: {year: (Year-18)}, // 預設選項是 18歲
            startDate: '-121y', // 當前年份-121y
            endDate: '-9y' // 當前年份-9y
        });
        $ocacEligibilityApprovalDate.datepicker({
            updateViewDate: true,
            autoclose: true,
            startView: 2,
            maxViewMode: 3,
            immediateUpdates: true,
            defaultViewDate: {year: (Year-40)},
            startDate: '-121y',
            endDate: '-21y'
        });
        $enrollmentAnnouncementDate.datepicker({
            updateViewDate: true,
            autoclose: true,
            startView: 2,
            maxViewMode: 3,
            immediateUpdates: true,
            defaultViewDate: {year: (Year-40)},
            startDate: '-121y',
            endDate: '-21y'
        });
    }

    // 處理編輯單招錄取資料模板
    function _handleEditEnrollmentDataModalShow() {
        // 顯示 modal
        $enrollmentDataModal.modal('show');
        // 按鈕預設狀態
        $saveEnrollmentDataBtn.html($saveEnrollmentDataBtn.html().replace('建立資料','儲存資料'));
        // 呼叫渲染單招錄取資料事件
        _setEnrollmentData(currentReportDataID, currentEnrollmentDataID);
    }

    // 擺放單招錄取資料
    function _setEnrollmentData(reportId, enrollmentId) {
        // 按鈕和欄位預設狀態
        $uploadMinistryOfEducationEligibilityFileArea.show();
        $uploadOCACEligibilityFileArea.show();
        $uploadEnrollmentAnnouncementFileArea.show();
        $enrollmentDataTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 編輯單招錄取資料</i>`);

        openLoading();
        // 取得單招錄取資料
        School.getIndependentAdmissionEnrollmentData(reportId,enrollmentId)
        .then((res) => {
			if(res.ok) {
				return res.json();
			} else {
				throw res;
			}
		})
        .then(async (json) => {
            $ministryOfEducationEligibilityApprovalDate.val(json.ministry_of_education_eligibility_approval_date);
            $ministryOfEducationEligibilityApprovalDocNumber.val(json.ministry_of_education_eligibility_approval_doc_number);
            $ocacEligibilityApprovalDate.val(json.ocac_eligibility_approval_date);
            $ocacEligibilityApprovalDocNumber.val(json.ocac_approval_doc_number);
            $enrollmentAnnouncementDate.val(json.enrollment_announcement_eligibility_approval_date);
            $enrollmentAnnouncementDocNumber.val(json.enrollment_announcement_eligibility_approval_doc_number);
            const $applied = (json.applied_at != null);
            if($applied){
                // 如果單招錄取資料已送件，按鈕和欄位的預設狀態
                $saveEnrollmentDataBtn.attr('disabled',true).hide();
                $applyEnrollmentDataBtn.attr('disabled',true).hide();
                $deleteEnrollmentDataBtn.attr('disabled',true).hide();
                $uploadMinistryOfEducationEligibilityFileBtn.attr('disabled',true);
                $uploadOCACEligibilityFileBtn.attr('disabled',true);
                $uploadEnrollmentAnnouncementFileBtn.attr('disabled',true);
                $deleteEnrollmentDataFileBtn.attr('disabled',true).hide();
                $('.btn-upload').hide();
                if(json.completed_at != null){ // 如果單招錄取資料已完成
                    $enrollmentDataTitle.html(`<i class="text-success fa fa-check" aria-hidden="true"> 處理完畢</i>`);
                } else {
                    $enrollmentDataTitle.html(`<i class="text-warning fa fa-hourglass-half" aria-hidden="true"> 等候處理</i>`);
                }
            } else {
                // 如果單招錄取資料未送件，按鈕和欄位的預設狀態
                $saveEnrollmentDataBtn.attr('disabled',false).show();
                $applyEnrollmentDataBtn.attr('disabled',false).show();
                $deleteEnrollmentDataBtn.attr('disabled',false).show();
                $uploadMinistryOfEducationEligibilityFileBtn.attr('disabled',false);
                $uploadOCACEligibilityFileBtn.attr('disabled',false);
                $uploadEnrollmentAnnouncementFileBtn.attr('disabled',false);
                $deleteEnrollmentDataFileBtn.attr('disabled',false).show();
                $uploadMinistryOfEducationEligibilityFileArea.show();
                $uploadOCACEligibilityFileArea.show();
                $uploadEnrollmentAnnouncementFileArea.show();
                // $saveEnrollmentDataBtn.html($saveEnrollmentDataBtn.html().replace('建立資料','儲存資料'));
                $('.btn-upload').show();
                if(json.returned_at != null) { // 如果單招錄取資料已退件
                    $enrollmentDataTitle.html(`<i class="text-danger fa fa-exclamation-circle" aria-hidden="true"> 退回待處理</i>`);
                } else {
                    $enrollmentDataTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 尚未發送</i>`);
                }
            }
            // 單招錄取資料檔案列表
            $uploadedEnrollmentDataFiles = json.files;
		}).then(()=>{
            _handleEnrollmentDataRenderFile();
            stopLoading();
        })
		.catch((err) => {
            stopLoading();
			err.json && err.json().then((data) => {
				console.error(data);
                swal({title:data.messages[0], confirmButtonText:'確定', type:'error'}).then(() => {
                    location.reload();
				});
			});
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
                        <tr class="edit-student-data-btn" data-user-id="${value.user_id}"">
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

    // 處理學生列表模板
    function _handleShowStudentDataListModalShow() {
        // 顯示 modal
        $studentDataListModal.modal('show');
        // 欄位預設狀態
        $studentList.find('tbody').html('');
        $studentDataListTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 學生列表</i>`);
        $studentFilter.val('');

        openLoading();
        // 取得學生資料列表
        School.getIndependentAdmissionStudentList(currentReportDataID)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        }).then((json) => {
            // 渲染學生列表
            studentAllList=json;
            $studentListPaginationContainer.pagination({
                dataSource: studentAllList,
                pageSize: 10,
                callback: function(studentAllList) {
                    _studentListTamplate(studentAllList);
                    $editStudentDataBtn = $('.edit-student-data-btn'); // 編輯學生資料按鈕的觸發事件（開啟 Modal）
                    $editStudentDataBtn.on('click', function () {
                        currentStudentDataID = $(this).closest('tr').data('user-id'); // 獲取 data-user-id
                        _handleEditStudentDataModalShow();
                    });
                }
            });
            stopLoading();
        }).catch((err) => {
            err.json && err.json().then((data) => {
                swal({title:data.messages[0], confirmButtonText:'確定', type:'warning'}).then(() => {
			    	location.replace('./studentData.html');
			    });
            });
            stopLoading();
        });
    }

    // 處理編輯學生資料模板
    function _handleEditStudentDataModalShow() {
        // 顯示和隱藏 modal
        $studentDataListModal.modal('hide');
        $studentDataModal.modal('show');

        // 呼叫渲染學生資料事件
        _setStudentData(currentReportDataID, currentStudentDataID, enrollmentHadApplied);
    }

    // 擺放學生資料
    function _setStudentData(reportId, userId, enrollmentHadApplied) {
        // 欄位預設狀態
        $studentDataTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 編輯學生資料</i>`);
        // $('#tab2-tab').hide(); // TODO: 上傳學生資料
        // $('#tab1-tab').html(`編輯單一學生資料`);

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
            $user_id.val(json.user_id);
            $student_id.val(json.overseas_student_id);
            $name.val(json.name);
            $identity.val(json.identity).selectpicker('refresh');
            $report_school.val(json.report_school);
            $qualification_approval_date_and_document_number.val(json.qualification_approval_date_and_document_number);
            $qualification_eligibility_status.val(json.qualification_eligibility_status).selectpicker('refresh');
            $admission_decision.val(json.admission_decision).selectpicker('refresh');
            $admission_list_date_and_document_number.val(json.admission_list_date_and_document_number);
            $admitted_school.val(json.admitted_school);
            $admitted_department.val(json.admitted_department);
            if(enrollmentHadApplied){ // 如果單招錄取資料已送件
                // 欄位預設狀態
                $saveStudentDataBtn.attr('disabled',true).hide();
            }else{
                // 欄位預設狀態
                $saveStudentDataBtn.attr('disabled',false).show();
            }
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

    // 處理單招錄取資料儲存
    async function _handleEnrollmentDataSave(event) {
        // 建立要傳送的資料欄位
        let enrollmentData = new enrollmentDataList({
            id: currentEnrollmentDataID,
            report_id: currentReportDataID,
            ministry_of_education_eligibility_approval_date: $ministryOfEducationEligibilityApprovalDate.val(),
            ministry_of_education_eligibility_approval_doc_number: $ministryOfEducationEligibilityApprovalDocNumber.val(),
            ocac_eligibility_approval_date: $ocacEligibilityApprovalDate.val(),
            ocac_approval_doc_number: $ocacEligibilityApprovalDocNumber.val(),
            enrollment_announcement_eligibility_approval_date: $enrollmentAnnouncementDate.val(),
            enrollment_announcement_eligibility_approval_doc_number: $enrollmentAnnouncementDocNumber.val()
        });

        if (currentEnrollmentDataID != 0) { // 如果有當前單招錄取資料ID，代表要送出單招錄取資料
            enrollmentData.id = currentEnrollmentDataID; // 加上 當前單招錄取資料ID 傳送
            enrollmentData.applied = event.data; // 加上 是送件的判斷 傳送
        }

        // 如果是送出單招錄取資料，跳出提示詢問
        if (enrollmentData.applied) {
            await swal({
    			title: '確定要送出錄取資料嗎？',
    			type: 'warning',
    			showCancelButton: true,
    			confirmButtonColor: '#5cb85c',
    			cancelButtonColor: '#dc3454',
    			confirmButtonText: '確定',
    			cancelButtonText: '取消',
    		})
    		.then((result)	=> {
                if (!result) {
                    return;
                }
            });
        }

        openLoading();
        // 傳送資料欄位
        School.saveIndependentAdmissionEnrollmentData(enrollmentData)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            swal({title:json.messages[0], confirmButtonText:'確定', type:'success'}).then(() => {
                location.reload();
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

    // 處理單招錄取資料刪除
    function _handleEnrollmentDataDelete() {
        // 跳出提示詢問
        swal({
			title: '確定要刪除此單招錄取？',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#5cb85c',
			cancelButtonColor: '#dc3454',
			confirmButtonText: '確定',
			cancelButtonText: '取消',
		})
		.then((result)	=> {
            openLoading();
            if (result) { // 確認刪除
                // 刪除單招錄取資料
                School.deleteIndependentAdmissionEnrollmentData(currentEnrollmentDataID)
                .then((res) => {
                    if(res.ok) {
                        return res.json();
                    } else {
                        throw res;
                    }
                })
                .then((json) => {
                    swal({title:json.messages[0], confirmButtonText:'確定', type:'success'}).then(() => {
                        location.reload();
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
            } else { // 取消返回
                return;
            }
        });
    }

    // 處理學生資料儲存
    function _handleStudentDataSave() {
        // 建立要傳送的資料欄位
        let studentData = new studentDataList({
            id: currentEnrollmentDataID,
            report_id: currentReportDataID,
            user_id: $user_id.val(),
            name: $name.val(),
            identity: $identity.val(),
            report_school: $report_school.val(),
            qualification_approval_date_and_document_number: $qualification_approval_date_and_document_number.val(),
            qualification_eligibility_status: $qualification_eligibility_status.val(),
            admission_decision: $admission_decision.val(),
            admission_list_date_and_document_number: $admission_list_date_and_document_number.val(),
            admitted_school: $admitted_school.val(),
            admitted_department: $admitted_department.val()
        });

        openLoading();
        // 傳送資料欄位
        School.saveIndependentAdmissionEnrollmentStudentData(studentData)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            swal({title:json.messages[0], confirmButtonText:'確定', type:'success'}).then(() => {
                location.reload();
            });
            stopLoading();
        })
        .catch((err) => {
            err.json && err.json().then((studentData) => {
                console.error(studentData);
                swal({title:studentData.messages[0], confirmButtonText:'確定', type:'error'});
            });
            stopLoading();
        });
    }

    // 處理單招錄取上傳檔案
    function _handleEnrollmentDataUploadFile(event) {
        // 取得當前要上傳檔案的單招錄取資料ID
        currentEnrollmentDataFileID = $(this).data('id'); // 獲取 data-userid

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
        School.uploadEnollmentDataFile(currentReportDataID, currentEnrollmentDataID, currentEnrollmentDataFileID, sendData)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            $uploadedEnrollmentDataFiles = json;
        })
        .then(()=>{
            _handleEnrollmentDataRenderFile();
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

    // 處理單招錄取檔案渲染
    function _handleEnrollmentDataRenderFile() {
        // 三個檔案欄位各自的 HTML 累積字串
        let uploadedMinistryOfEducationEligibilityFileAreaHtml = '';
        let uploadedOCACEligibilityFileAreaHtml = '';
        let uploadedEnrollmentAnnouncementFileAreaHtml = '';

        $uploadedEnrollmentDataFiles.forEach((file) => {
            // 檔名格式：01_亂數.pdf / 02_亂數.jpg / 03_亂數.png ...
            const fileType = _getFileType(file.split('.').pop()); // 取副檔名
            const filePrefix = file.split('_')[0];

            // 產生這個檔案的 HTML
            let html = '';
            if (fileType === 'img') {
                html = `
                    <img
                        class="img-thumbnail"
                        src="${env.baseUrl}/independent-admission/enrollment-report/file/${currentReportDataID}/${currentEnrollmentDataID}/${file}"
                        data-toggle="modal"
                        data-filename="${file}"
                        data-target=".img-modal"
                        data-filetype="img"
                        data-filelink="${env.baseUrl}/independent-admission/enrollment-report/file/${currentReportDataID}/${currentEnrollmentDataID}/${file}"
                    />
                `;
            } else {
                html = `
                    <div
                        class="img-thumbnail non-img-file-thumbnail"
                        data-toggle="modal"
                        data-target=".img-modal"
                        data-filelink="${env.baseUrl}/independent-admission/enrollment-report/file/${currentReportDataID}/${currentEnrollmentDataID}/${file}"
                        data-filename="${file}"
                        data-filetype="${fileType}"
                        data-icon="fa-file-${fileType}-o"
                    >
                        <i class="fa fa-file-${fileType}-o"
                           data-filename="${file}"
                           data-icon="fa-file-${fileType}-o"
                           aria-hidden="true"></i>
                    </div>
                `;
            }

            // 依照檔名前綴，累加到對應的「檔案欄位 HTML 變數」
            switch (filePrefix) {
                case '01':
                    uploadedMinistryOfEducationEligibilityFileAreaHtml += html;
                    break;
                case '02':
                    uploadedOCACEligibilityFileAreaHtml += html;
                    break;
                case '03':
                    uploadedEnrollmentAnnouncementFileAreaHtml += html;
                    break;
                default:
                    break;
            }
        });

        // 把三個區塊都渲染出來（有檔案就有內容、沒檔案就是空字串）
        $uploadedMinistryOfEducationEligibilityFileArea.innerHTML = uploadedMinistryOfEducationEligibilityFileAreaHtml;
        $uploadedOCACEligibilityFileArea.innerHTML = uploadedOCACEligibilityFileAreaHtml;
        $uploadedEnrollmentAnnouncementFileArea.innerHTML = uploadedEnrollmentAnnouncementFileAreaHtml;
    }

    // 處理檔案打開顯示
    function _handleEnrollmentDataShowFile(){
        // 取得檔案名字和類型
		const fileName = $(this).data('filename');
		const fileType = $(this).data('filetype');

		// 檔案欄位預設狀態
		$imgModalBody.html('');

		// 是圖用 img tag ，pdf用 embed tag
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
        $deleteEnrollmentDataFileBtn.attr({
            'filetype': fileType,
            'filename': fileName,
         });
    }

    // 處理檔案刪除
    function _handleEnrollmentDataDeleteFile() {
        // 取得檔案名字
        let fileName = $deleteEnrollmentDataFileBtn.attr('filename');
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
                School.deleteEnrollmentDataFile(currentReportDataID,currentEnrollmentDataID,fileName)
                .then((res) => {
                    if(res.ok) {
                        return res.json();
                    } else {
                        throw res;
                    }
                })
                .then((json) => {
                    $uploadedEnrollmentDataFiles = json;
                })
                .then(()=>{
                    _handleEnrollmentDataRenderFile();
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
        _filterStudentList = studentAllList.filter(function (obj) {
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
        } else {
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