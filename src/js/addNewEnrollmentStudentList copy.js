(()=>{
    const $paginationContainer = $('#pagination-container'); // 分頁器區域
    // const $studentListPaginationContainer = $('#student-list-pagination-container'); // 分頁區域
    // const $studentFilterInput = $('#student-filter-input'); // 搜尋欄
    const $applyList = $('#apply-list') // 請求列表
    const $enrollmentStudentModal = $('#editEnrollmentStudentModal'); // 請求編輯模板
    // const $studentDataListModal = $('#showStudentDataListModal'); // 請求編輯模板
    const $addEnrollmentStudentBtn = $('#btn-add-enrollment-student'); // 新增請求按鈕
    // const $showStudentDataListBtn = $('#btn-show-student-data-list'); // 新增請求按鈕
    // const $studentList = $('#student-list'); // student 列表

    // 請求編輯模板物件
    const $enrollmentStudentTitle = $('#enrollmentStudentModalHeader'); // 新增學生模板的Title
    // const $studentDataListTitle = $('#studentDataListModalHeader'); // 學生列表模板的Title
    // const $actionSelector = $('#action-selector'); // 動作選擇選項
    // const $systemSelector = $('#system-selector'); // 學制選擇選項
    // const $typeSelector = $('#type-selector'); // 類型選擇選項
    // const $groupSelector = $('#group-selector'); // 類組選擇選項
    // const $departmentTitle = $('#department-title') // 請求之核定系名
    // const $applyDetailedInput = $('.apply-detailed-input'); // 請求之詳細資訊輸入區域
    // const $deptIdForm = $('#deptIdForm');
    // const $changeDepartmentTitleForm = $('#changeDepartmentTitleForm');
    // const $changeGroupCodeForm = $('#changeGroupCodeForm');
    // const $ConbineDeptIdForm = $('#ConbineDeptIdForm');
    // const $deptIdInput = $('#dept-id');
    // const $oldDepeTitleInput = $('#old-dept-title');
    // const $newDepeTitleInput = $('#new-dept-title');
    // const $oldGroupCodeSelector = $('#old-group-code-selector');
    // const $newGroupCodeSelector = $('#new-group-code-selector');
    // const $conbineDeptIdInput1 = $('#conbine-dept-id-1');
    // const $conbineDeptIdInput2 = $('#conbine-dept-id-2');
    // const $deptList = $('#dept-list');
    // 新增學生資料欄位
    const $uploadMinistryOfEducationEligibilityFileArea = $('#uploadMinistryOfEducationEligibilityFileArea');
    const $uploadOCACEligibilityFileArea = $('#uploadOCACEligibilityFileArea');
    const $uploadEnrollmentAnnouncementEligibilityFileArea = $('#uploadEnrollmentAnnouncementEligibilityFileArea');

    // 學生資料欄位
    let reportId = '';
    const $user_id = $('#user_id');
    const $studentId = $('#studentId');
    const $name = $('#name');
    const $identity = $('#identity');

    // 學生資料操作按鈕
    const $saveEnrollmentStudentDataBtn = $('#save-enrollment-student-data-btn'); // 儲存按鈕

    // 編輯模板上傳檔案相關物件
    const $uploadedMinistryOfEducationEligibilityFileArea = document.getElementById('uploadedMinistryOfEducationEligibilityFileArea');
    const $uploadedOCACEligibilityFileArea = document.getElementById('uploadedOCACEligibilityFileArea');
    const $uploadedEnrollmentAnnouncementEligibilityFileArea = document.getElementById('uploadedEnrollmentAnnouncementEligibilityFileArea');
    const $uploadStudentDataFileBtn = $('#ministry-of-educatio-eligibility-file-upload');
    const $uploadOCACEligibilityFileBtn = $('#ocac-eligibility-file-upload');
    const $uploadEnrollmentAnnouncementEligibilityFileBtn = $('#enrollment-announcemen-eligibility-file-upload');
    const $deleteStudentDataFileBtn = $('.delete-ministry-of-educatio-eligibility-file');
    const $deleteOCACEligibilityFileBtn = $('.delete-ocac-eligibility-file');
    const $deleteEnrollmentAnnouncementEligibilityFileBtn = $('.delete-enrollment-announcemen-eligibility-file');
    const $imgModal = $('#img-modal');
    const $imgModalBody= $('#img-modal-body');

    // 中文名稱陣列 方便 代碼轉換%
    // const action_array = ['','新增系所','更改系名','更換類組','合併系所'];
    // const system_array = ['','學士班','港二技','碩士班','博士班'];
    // const type_array = ['一般系所','重點產業系所','國際專修部'];
    // const group_array = ['','第一類組','第二類組','第三類組'];

    // console.log(year_array);
    // let country_list_array = '';
    let _filterStudentList = [];
    let $studentAllList = [];

    let applyListArray = []; // 目前請求有哪些
    let $uploadedStudentDataFiles = []; // 學生當前請求有哪些檔案
    let $uploadedOCACEligibilityFiles = []; // 學生當前請求有哪些檔案
    let $uploadedEnrollmentAnnouncementEligibilityFiles = []; // 學生當前請求有哪些檔案
    // let currentStudentDataID = 0; // 當前請求的ID
    let isApplied = false; // 當前請求是否送出

    class addStudentData{
        constructor({
            report_id = null,
            user_id = 0,
            student_id = null,
            identity,
            name = null
        }={}){
            this.report_id =report_id;
            this.user_id =user_id;
            this.student_id = student_id;
            this.identity = identity;
            this.name = name;
        }
    }

    $uploadStudentDataFileBtn.on('change', true, _handleUploadFile);
    $uploadOCACEligibilityFileBtn.on('change', true, _handleOCACEligibilityUploadFile);
    $uploadEnrollmentAnnouncementEligibilityFileBtn.on('change', true, _handleEnrollmentAnnouncementEligibilityUploadFile);
    $addEnrollmentStudentBtn.on('click', _handleNewEnrollmentModalShow);
    // $showStudentDataListBtn.on('click', _handleShowStudentDataListModalShow);
    $saveEnrollmentStudentDataBtn.on('click', false, _handleStudentDataSave);
    $deleteStudentDataFileBtn.on('click', _handleStudentDataDeleteFile);
    // $studentFilterInput.on('keyup', _filterStudentInput); // 學生列表篩選
    $('body').on('click', '.img-thumbnail', _handleShowFile);
    // 如果關閉已上傳檔案modal 依舊保持focus在文憑成績編輯modal上
    $imgModal.on('hidden.bs.modal', function(e){
        $('body').addClass('modal-open');
    });



    init();

    async function init(){
        let res = await User.isLogin();
        if(res == true) {
            _setData();
        }
    }

    function _setData() {
        openLoading();
        School.getAddNewIndependentAdmissionReportList()
        .then((res) => {
			if(res.ok) {
				return res.json();
			} else {
				throw res;
			}
		})
        .then((json) => {
            // console.log(json);
            applyListArray = json;

            // _handleSystemSelectorRender(json[1]); // 渲染學制選項

            // 進行文憑列表分頁初始化渲染工作
            $paginationContainer.pagination({
                dataSource: applyListArray,
                pageSize: 10,
                callback: function(applyListArray,pagination) {
                    _applyListTamplate(applyListArray, pagination.pageNumber);
                    const $addEnrollmentStudentBtn = $('.btn-addStudentData'); // 新增建立學生資料按鈕的觸發事件（開啟 Modal）
                    $addEnrollmentStudentBtn.on('click', _handleNewEnrollmentModalShow);
                }
            });

		})
        .then(() =>{
            // _handleSystemChoose();
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

    // 請求列表轉換並渲染
    function _applyListTamplate(datas,page) {
        // 渲染 請求列表
        $applyList.html('');
        // console.log(datas);
        datas.forEach(function (data, index) {
            const academicYear = data.academic_year;
            const phase = data.phase;
            const admissionYear = data.admission_year;
            const reportFrequency = data.report_frequency;
            const reportTitle = data.report_title;
            const applied_at = _formatDate(data.applied_at);
            // const admissionQuotaSource = admission_quota_source_array[data.admission_quota_source];
            // const deptTitle = (data.dept_title) ?data.dept_title:'';
            let status = '';
            let buttonStatus = '';
            let buttonColor = '';
            if(data.applied_at != null){
                if (data.completed_at == null) {
                    status  = '<i class="fa fa-hourglass-half fa-fw" aria-hidden="true"></i> 等候處理';
                    buttonColor = 'btn-warning';
                } else {
                    status  = '<i class="fa fa-check fa-fw" aria-hidden="true"></i> 處理完畢';
                    buttonColor = 'btn-success';
                }
                buttonStatus = 'disabled';
            } else {
                if (data.returned_at != null) {
                    status = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> 退回待處理';
                    buttonColor = 'btn-danger';
                } else {
                    status = '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i> 點擊編輯';
                    buttonColor = 'btn-outline-info';
                }
            }

            let listHtml = `<tr class="" data-id="${data.id}">`;
            // listHtml += `<td>${data.id}</td>`;
            listHtml += `<td>${index+1+((page-1)*10)}</td>`;
            listHtml += `<td>${academicYear}</td>`;
            listHtml += `<td>${phase}</td>`;
            listHtml += `<td>${admissionYear}</td>`;
            listHtml += `<td>${reportFrequency}</td>`;
            listHtml += `<td>${reportTitle}</td>`;
            listHtml += `<td>${applied_at}</td>`;
            listHtml += `<td></td>`;
            listHtml += `<td><button class="btn btn-outline-primary btn-addStudentData same-width-button" id="btn-add-student-data"><i class="fa fa-plus fa-fw" aria-hidden="true"></i>新增單招錄取名冊</button></td>`;
            listHtml += `</tr>`;
            $applyList.append(listHtml);
        });
    }

    function _handleEditEnrollmentStudentModalShow() {
        // show modal
        $saveEnrollmentStudentDataBtn.html($saveEnrollmentStudentDataBtn.html().replace('新增','儲存'));
        $enrollmentStudentModal.modal();
        Student.getCountryList()
            .then((json) => {
                // console.log(json);
                country_list_array = json;
                // const country_list_array = [json[id], json[country]];
                $birthLocation.selectpicker({title: '請選擇'});
                $residentLocation.selectpicker({title: '請選擇'});
                $moveBeforeResidentLocation.selectpicker({title: '請選擇'});
                $schoolLocation.selectpicker({title: '請選擇'});
                // $birthLocation.attr('disabled',false); // disable selector
                Object.entries(country_list_array).forEach(([key, value]) => {
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
            })
            .then(() =>{
                // _handleSystemChoose();
                stopLoading();
            });
        // 取得 請求的userid
        // currentApplyID = $(this).closest('tr').data('id'); // 獲取 data-id
        currentStudentDataID = $(this).closest('tr').data('userid'); // 獲取 data-userid
        // 呼叫渲染文憑成績資料事件
        _setStudentData(reportId, currentStudentDataID);
    }

    //
    function _handleDeptSelectorRender($system_id) {
        School.getSystemQuota($system_id).then(function (res) {
			if(res.ok) {
				return res.json();
			} else {
				throw res;
			}
		}).then(function (json) {
            $deptList.selectpicker({title: '以原系名搜尋學系代碼'});
            let deptHtml = '';
            json.departments.forEach((el) => {
                if(el == null) return;
                deptHtml += `<option value="${el.id}">${el.title}</option>`;
            });
            $deptList.html(deptHtml);
            $deptList.selectpicker('refresh'); // refresh selector
            $deptList.parent().find('button').removeClass('bs-placeholder'); // 移除預設樣式
		}).catch(function (err) {
            console.log(err);
			if (err.status === 404) {

			} else {
				err.json && err.json().then((data) => {
					console.error(data);
					swal({title:data.messages[0], confirmButtonText:'確定', type:'error'});
				});
			}
		});
    }

    // 學制選項渲染
    function _handleSystemSelectorRender(data) {

        $systemSelector.html('');
        // 該校不只一個學制
        if(data.length > 1){
            $systemSelector.append(`<option value="-1" selected disabled hidden>請選擇</option>`);
        }

        // 渲染各學制選項
        data.forEach((system) => {
            switch(system.type_id){
                case 1:
                    $systemSelector.append(`<option value="1">學士班</option>`);
                    break;
                case 2:
                    $systemSelector.append(`<option value="2">港二技</option>`);
                    break;
                case 3:
                    $systemSelector.append(`<option value="3">碩士班</option>`);
                    break;
                case 4:
                    $systemSelector.append(`<option value="4">博士班</option>`);
                    break;
            }
        });

        // 如果只有一個學制就幫它選
        // if(data.length == 1){
            // $systemSelector.val(data[0].type_id);
            // _handleSystemChoose();
        // } else {
            // $systemSelector.val("-1");
        // }
        // $systemSelector.attr('disabled',false);
    }

    // 學制變換偵測
    function _handleSystemChoose() {
        const system_id = $systemSelector.val();
        if (!system_id) return;
        const action_id = $actionSelector.val();
        const dept_type = $typeSelector.val();

        $actionSelector.attr('disabled',false);
        $typeSelector.attr('disabled',false);

        $actionSelector.html(`
            <option value="-1" selected disabled hidden>請選擇</option>
            <option value="1">新增系所</option>
            <option value="2">更改系名</option>
        `);
        if(system_id == 1){
            $actionSelector.append(`
                <option value="3">更換類組</option>
            `)
        }
        $actionSelector.append(`
            <option value="4">合併系所</option>
        `);

        $typeSelector.html(`
            <option value="-1" selected disabled hidden>請選擇</option>
            <option value="0">一般系所</option>
        `);

        if(system_id != 2){
            $typeSelector.append(`
                <option value="1">重點產業系所</option>
            `);
        }

        if(system_id == 1){
            $typeSelector.append(`
                <option value="2">國際專修部</option>
            `);
        }

        if(action_id != null && !(system_id > 1 && action_id == 3)){
            $actionSelector.val(action_id);
        }

        if(dept_type != null && !(system_id > 1 && dept_type == 2) && !(system_id == 2 && dept_type == 1)){
            $typeSelector.val(dept_type);
        }

        // _handleDeptSelectorRender(system_id);
    }

    function _setStudentData(reportId, userId) {
        // console.log(id);
        $uploadMinistryOfEducationEligibilityFileArea.show();
        $enrollmentStudentTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 編輯學生資料</i>`);
        $('#tab2-tab').hide();
        $('#tab1-tab').html(`編輯單一學生資料`);
        // openLoading();
        School.getIndependentAdmissionStudentData(reportId,userId)
        .then((res) => {
			if(res.ok) {
				return res.json();
			} else {
				throw res;
			}
		})
        .then(async (json) => {
            // console.log(json);

            $user_id.val(json[0].user_id);
            $studentId.val(json[0].overseas_student_id);
            $systemId.val(json[0].system_id).selectpicker('refresh');
            $identity.val(json[0].identity).selectpicker('refresh');
            $name.val(json[0].name);
            $engName.val(json[0].eng_name);
            $gender.val(json[0].gender).selectpicker('refresh');
            $email.val(json[0].email);
            $birthday.val(json[0].birthday);
            $birthLocation.val(json[0].birth_location).selectpicker('refresh');
            $residentLocation.val(json[0].resident_location).selectpicker('refresh');
            $residentPhone.val(json[0].resident_phone);
            $residentAddress.val(json[0].resident_address);
            $moveResidentLocationYear.val(json[0].move_resident_location_year);
            $moveBeforeResidentLocation.val(json[0].move_before_resident_location).selectpicker('refresh');
            $residentId.val(json[0].resident_id);
            $residentPassportNo.val(json[0].resident_passport_no);
            $placeOriginProvince.val(json[0].place_origin_province);
            $placeOriginCountyCity.val(json[0].place_origin_county_city);
            $taiwanId.val(json[0].taiwan_id);
            $taiwanPassportNo.val(json[0].taiwan_passport_no);
            $taiwanPhone.val(json[0].taiwan_phone);
            $taiwanAddress.val(json[0].taiwan_address);
            $dadMomName.val(json[0].dad_mom_name);
            $dadMomEngName.val(json[0].dad_mom_eng_name);
            $dadMomBirthday.val(json[0].dad_mom_birthday);
            $momDadName.val(json[0].mom_dad_name);
            $momDadEngName.val(json[0].mom_dad_eng_name);
            $momDadBirthday.val(json[0].mom_dad_birthday);
            $twContactName.val(json[0].tw_contact_name);
            $twContactPhone.val(json[0].tw_contact_phone);
            $twContactAddress.val(json[0].tw_contact_address);
            $schoolLocation.val(json[0].school_location).selectpicker('refresh');
            $schoolName.val(json[0].school_name);
            $educationSystemDescription.val(json[0].education_system_description);
            $("input[name=applyMedicineDentist][value='" + json[0].apply_medicine_dentist + "']").prop("checked", true);
            // $applyMedicineDentist.val(json[0].apply_medicine_dentist);
            $("input[name=applyWay][value='" + json[0].apply_way + "']").prop("checked", true);
            // $applyWay.val(json[0].apply_way);
            $studentMemo.val(json[0].memo);
            // const departmentTitleText = (json[0].dept_title) ?json[0].dept_title:'';
            // $systemSelector.val(json[0].system_id);
            // $actionSelector.val(json[0].action_id);
            // $typeSelector.val(json[0].dept_type);
            // $groupSelector.val(json[0].group_code);
            // $departmentTitle.val(departmentTitleText);
            // $deptIdInput.val(json[0].dept_id);
            // $oldDepeTitleInput.val(json[0].old_dept_title);
            // $newDepeTitleInput.val(json[0].new_dept_title);
            // $oldGroupCodeSelector.val(json[0].old_group_code);
            // $newGroupCodeSelector.val(json[0].new_group_code);
            // $conbineDeptIdInput1.val(json[0].conbine_dept_id_1);
            // $conbineDeptIdInput2.val(json[0].conbine_dept_id_2);
            $uploadedStudentDataFiles = json[1];
            // console.log(json[1]);
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

    function _handleNewEnrollmentModalShow() {
        // init modal

        $('#tab2-tab').show();
        $('#tab1-tab').html(`新增單招錄取名冊`);
        // $academicYearSelector.val("-1");
        // $phaseSelector.val("-1");
        // $admissionYearSelector.val("-1");
        // $admissionQuotaSourceSelector.val("-1");
        // $reportDate.attr('disabled',false);
        // $academicYearSelector.attr('disabled',false);
        // $phaseSelector.attr('disabled',false);
        // $reportFrequency.attr('disabled',false);
        // $admissionYearSelector.attr('disabled',false);
        // $admissionQuotaSourceSelector.attr('disabled',false);
        // $reportTitle.attr('disabled',false);
        // $applyStartDate.attr('disabled',false);
        // $applyEndDate.attr('disabled',false);
        // $releaseDate.attr('disabled',false);
        // $independentAdmissionApprovalDocNumber.attr('disabled',false);
        // $memo.attr('disabled',false);
        // $user_id.attr('disabled',false);
        $studentId.attr('disabled',false);
        $name.attr('disabled',false);
        $engName.attr('disabled',false);
        // $gender.attr('disabled',false);
        $email.attr('disabled',false);
        // $systemId.attr('disabled',false);
        // $identity.attr('disabled',false);
        $birthday.attr('disabled',false);
        // $birthLocation.attr('disabled',false);
        // $residentLocation.attr('disabled',false);
        $residentPhone.attr('disabled',false);
        $residentAddress.attr('disabled',false);
        $moveResidentLocationYear.attr('disabled',false);
        // $moveBeforeResidentLocation.attr('disabled',false);
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
        // $schoolLocation.attr('disabled',false);
        $schoolName.attr('disabled',false);
        $educationSystemDescription.attr('disabled',false);
        // $applyMedicineDentist.attr('disabled',false);
        // $applyWay.attr('disabled',false);
        $studentMemo.attr('disabled',false);


        isApplied = false;
        // currentApplyID = '';
        currentStudentDataID = '';

        // $reportDate.val('');
        // $reportFrequency.val('');
        // $reportTitle.val('');
        // $applyStartDate.val('');
        // $applyEndDate.val('');
        // $releaseDate.val('');
        // $independentAdmissionApprovalDocNumber.val('');
        // $memo.val('');
        // $applicantName.val('');
        // $applicantJobTitle.val('');
        // $applicantPhone.val('');
        // $applicantUnit.val('');
        // $applicantEmail.val('');
        $uploadedMinistryOfEducationEligibilityFileArea.innerHTML = '';
        // $returnReason.html('');
        $user_id.val('');
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
        // $("input[name=applyMedicineDentist][value='" + json[0].apply_medicine_dentist + "']").prop("checked", true);
        // $("input[name=applyWay][value='" + json[0].apply_way + "']").prop("checked", true);
        $('input[name=applyMedicineDentist]').prop('checked', false);
        $('input[name=applyWay]').prop('checked', false);
        // $applyMedicineDentist.val('');
        // $applyWay.val('');
        $studentMemo.val('');
        $saveEnrollmentStudentDataBtn.html($saveEnrollmentStudentDataBtn.html().replace('儲存','新增'));
        $enrollmentStudentTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 新增單招錄取名冊</i>`);

        // $returnReason.hide();
        // $uploadFileArea.hide();
        $saveEnrollmentStudentDataBtn.attr('disabled',false).show();
        reportId = $(this).closest('tr').data('id'); // 獲取 data-id
        // console.log(reportId);

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

        Student.getCountryList()
        .then((json) => {
            // console.log(json);
            country_list_array = json;
            // const country_list_array = [json[id], json[country]];
            $birthLocation.selectpicker({title: '請選擇'});
            $residentLocation.selectpicker({title: '請選擇'});
            $moveBeforeResidentLocation.selectpicker({title: '請選擇'});
            $schoolLocation.selectpicker({title: '請選擇'});
            // $birthLocation.attr('disabled',false); // disable selector
            Object.entries(country_list_array).forEach(([key, value]) => {
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
        })
        .then(() =>{
            // _handleSystemChoose();
            stopLoading();
        });

        $gender.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
        $systemId.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式
        $identity.parent().find('button').removeClass('bs-placeholder'); // 為了風格統一 去除預設格式


        // console.log(country_list_array);



        // console.log(_countryList);
        // _countryList.forEach(item => {
            // $birthLocation.append(`<option value="${item.id}">${item.country}</option>`);
        // });
        // $appliedBtn.attr('disabled',false).hide();
        // $deleteBtn.attr('disabled',false).hide();

        // year_array.forEach(year => {
        //     $academicYearSelector.append(`<option value="${year}">${year}</option>`);
        // });

        // phase_array.forEach(phase => {
        //     $phaseSelector.append(`<option value="${phase}">${phase}</option>`);
        // });

        // admission_year_array.forEach(admission_year => {
        //     $admissionYearSelector.append(`<option value="${admission_year}">${admission_year}</option>`);
        // });

        // admission_quota_source_array.forEach(admission_quota_source => {
        //     $admissionQuotaSourceSelector.append(`<option value="${admission_quota_source}">${admission_quota_source}</option>`);
        // });
        // show modal
        $enrollmentStudentModal.modal();
    }

    function _handleShowStudentDataListModalShow() {
        reportId = $(this).closest('tr').data('id'); // 獲取 data-id
        // $user_id = '';
        $studentList.find('tbody').html('');

        School.getIndependentAdmissionStudentList(reportId) // 取得 student 列表
        .then((res) => {
            if(res.ok) { // 有資料則開始頁面初始化
                // _initCountryList();
                return res.json();
            } else {
                throw res;
            }
        }).then((json) => {
            // console.log(json);
            //作分頁

            $studentAllList=json;
            $studentListPaginationContainer.pagination({
                dataSource: json,
                pageSize: 20,
                callback: function(json, pagination) {
                    _studentListTamplate(json);
                    $editStudentInfoBtn = $('.btn-editStudentInfo'); // 新增學生資料編輯按鈕的觸發事件（開啟 Modal）
                    $editStudentInfoBtn.on('click', _handleEditEnrollmentStudentModalShow);
                    // $editStudentInfoBtn.on('click', _handleEditStudentInfo);

                }
            });
        }).then(() => {
            $.bootstrapSortable(true); // 啟用列表排序功能
            // $editStudentInfoBtn = $('.btn-editStudentInfo'); // 新增學生資料編輯按鈕的觸發事件（開啟 Modal）
            // $editStudentInfoBtn.on('click', _handleEditStudentInfo);


            stopLoading();
        }).catch((err) => {
            err.json && err.json().then((data) => {
                // console.error(data);
                swal({title:data.messages[0], confirmButtonText:'確定', type:'warning'});
            });
            stopLoading();
        });
        $studentDataListTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 學生列表</i>`);
        $studentDataListModal.modal();

    }

    function _studentListTamplate(json){
        // 渲染 student 列表
        $studentList.find('tbody').html('');
        json.forEach(function (value, index) {
            const identity = ['港澳生', '港澳具外國國籍之華裔學生', '海外僑生'];

            const system = ['學士班', '港二技', '碩士班', '博士班', '轉學生'];

            var system_name = '';
            var identity_name = '';
            var gender_name = '';
            let student_name = encodeHtmlCharacters(value.name);
            let student_eng_name = encodeHtmlCharacters(value.eng_name);

            if (value) {
                if (value.system_id) {
                    system_name = system[value.system_id - 1];
                }

                if (value.identity) {
                    identity_name = identity[value.identity - 1];
                }

                if (value.gender === 'M') {
                    gender_name = '男';
                } else if (value.gender === 'F') {
                    gender_name = '女';
                }
            }

            $studentList
                .find('tbody')
                .append(`
                        <tr class="btn-editStudentInfo" data-userid="${value.user_id}">
                            <td>
                                <span><i class="fa fa-pencil" aria-hidden="true"></i></span>
                            </td>
                            <td>${(value.user_id)}</td>
                            <td>${value.overseas_student_id || ""}</td>
                            <td>${student_name} &nbsp;&nbsp;&nbsp;&nbsp; ${student_eng_name}</td>
                            <td>${gender_name}</td>
                            <td>${value.email}</td>
                            <td>${system_name}</td>
                            <td>${identity_name}</td>
                        </tr>`);

        });
        $.bootstrapSortable(true);
    }

    // 切換動作時重新渲染欄位
    function _handleActionChange() {
        // $applyDetailedInput.show();
        $deptIdForm.hide();
        $changeDepartmentTitleForm.hide();
        $changeGroupCodeForm.hide();
        $ConbineDeptIdForm.hide();
        switch($actionSelector.val()){
            case '1':
                // $applyDetailedInput.hide();
                break;
            case '2':
                $deptIdForm.show();
                $changeDepartmentTitleForm.show();
                if(!isApplied){
                    $deptIdInput.attr('disabled',false);
                    $oldDepeTitleInput.attr('disabled',false);
                    $newDepeTitleInput.attr('disabled',false);
                }
                break;
            case '3':
                $deptIdForm.show();
                $changeGroupCodeForm.show();
                if(!isApplied){
                    $deptIdInput.attr('disabled',false);
                    $oldGroupCodeSelector.attr('disabled',false);
                    $newGroupCodeSelector.attr('disabled',false);
                }
                break;
            case '4':
                $ConbineDeptIdForm.show();
                if(!isApplied){
                    $deptIdInput.attr('disabled',false);
                    $conbineDeptIdInput1.attr('disabled',false);
                    $conbineDeptIdInput2.attr('disabled',false);
                }
                break;
        }
    }

    // 學生資料儲存事件
    function _handleStudentDataSave(event) {
        let studentData = new addStudentData({
            report_id: reportId,
            user_id: $user_id.val(),
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
            apply_medicine_dentist: $(".applyMedicineDentist:checked").val(),
            apply_way: $(".applyWay:checked").val(),
            student_memo: $studentMemo.val(),
        });

        if (currentStudentDataID != '') {
            // studentData.apply_id = reportId;
            studentData.user_id = currentStudentDataID;
            studentData.applied = event.studentData;
        }
        // switch(data.action_id){
            // case '2':
                // data.dept_id = $deptIdInput.val();
                // data.old_dept_title = $oldDepeTitleInput.val();
                // data.new_dept_title = $newDepeTitleInput.val();
                // break;
            // case '3':
                // data.dept_id = $deptIdInput.val();
                // data.old_group_code = $oldGroupCodeSelector.val();
                // data.new_group_code = $newGroupCodeSelector.val();
                // break;
            // case '4':
                // data.conbine_dept_id_1 = $conbineDeptIdInput1.val();
                // data.conbine_dept_id_2 = $conbineDeptIdInput2.val();
                // break;
            // default :
                // break;
        // }

        console.log(reportId);

        // openLoading();
        School.saveIndependentAdmissionStudentData(studentData)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            // console.log(json);
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

    // 上傳檔案事件
    function _handleUploadFile(event) {
        // 可以一次上傳多個檔案 所以先取得遇上傳檔案清單
        // console.log('是不是學生檔案:' + event.data);

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
        School.uploadStudentDataFile(reportId, currentStudentDataID, sendData)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            // console.log(json);
            $uploadedStudentDataFiles = json;
        })
        .then(()=>{
            _handleStudentDataRenderFile();
        })
        .then(()=>{
            swal({title:`上傳成功`, confirmButtonText:'確定', type:'success'}).then(() => {
                // location.reload();
                event.target.value = ''; // 重置 input
            });
            // stopLoading();

        })
        .catch((err) => {
            err.json && err.json().then((data) => {
                console.error(data);
                swal({title:data.messages[0], confirmButtonText:'確定', type:'error'});
            });
            stopLoading();
        });

    }

    // 學生檔案渲染事件
    function _handleStudentDataRenderFile() {
        currentStudentDataID = $user_id.val();
        console.log($uploadedStudentDataFiles);
        let uploadedStudentDataAreaHtml = '';
        $uploadedStudentDataFiles.forEach((file) => {
            const fileType = _getFileType(file.split('.')[1]);
            if(fileType === 'img'){
                uploadedStudentDataAreaHtml += `
                    <img
                        class="img-thumbnail"
                        src="${env.baseUrl}/independent-admission/student-report/file/${reportId}/${currentStudentDataID}/${file}"
                        data-toggle="modal"
                        data-filename="${file}"
						data-target=".img-modal"
                        data-filetype="img"
                        data-filelink="${env.baseUrl}/independent-admission/student-report/file/${reportId}/${currentStudentDataID}/${file}"
                    />
                `
            } else {
                uploadedStudentDataAreaHtml += `
					<div
						class="img-thumbnail non-img-file-thumbnail"
						data-toggle="modal"
						data-target=".img-modal"
						data-filelink="${env.baseUrl}/independent-admission/student-report/file/${reportId}/${currentStudentDataID}/${file}"
						data-filename="${file}"
                        data-filetype="${fileType}"
						data-icon="fa-file-${fileType}-o"
					>
						<i class="fa fa-file-${fileType}-o" data-filename="${file}" data-icon="fa-file-${fileType}-o" aria-hidden="true"></i>
					</div>
				`;
            }
        })
        $uploadedMinistryOfEducationEligibilityFileArea.innerHTML = uploadedStudentDataAreaHtml;

    }

    // 檔案放大顯示事件
    function _handleShowFile(){

		const fileName = $(this).data('filename');
		const fileType = $(this).data('filetype');

		// 清空 modal 內容
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

        $deleteStudentDataFileBtn.attr({
            'filetype': fileType,
            'filename': fileName,
         });

    }

    // 檔案刪除事件
    function _handleStudentDataDeleteFile() {
        currentStudentDataID = $user_id.val();
        console.log(currentStudentDataID);
        let fileName = $deleteStudentDataFileBtn.attr('filename');
        if(confirm('確定要刪除此檔案？')){
            openLoading();
            School.deleteStudentDataFile(reportId,currentStudentDataID,fileName)
            .then((res) => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw res;
                }
            })
            .then((json) => {
                // console.log(json);
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
    }

    // 依選取的系名填入學系代碼，若當前為更改系名，同時填入原系所名稱
    function _handleSelectDept() {
        if ($(this).find(':selected').val() != -1) {
            $deptIdInput.val($(this).val());
            if($actionSelector.val() == '2') {
                $oldDepeTitleInput.val($(this).find(':selected').text());
            }
        }
    }

    // 檔案大小計算是否超過 limit MB
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

    function _filterStudentInput(e) { // 搜尋過濾列表

        const filter = $studentFilterInput.val().toUpperCase();
        //console.log(filter);
        // for (i = 0; i < tr.length; i++) {
        //     let id = tr[i].getElementsByTagName("td")[1]; // 報名序號
        //     let overseas_id = tr[i].getElementsByTagName("td")[2]; // 僑生編號
        //     let name = tr[i].getElementsByTagName("td")[3]; // 姓名
        //     let email = tr[i].getElementsByTagName("td")[4]; // Email
        //
        //     if (id || overseas_id || email || name) {
        //         if (id.innerHTML.toUpperCase().indexOf(filter) > -1
        //             || overseas_id.innerHTML.toUpperCase().indexOf(filter) > -1
        //             || email.innerHTML.toUpperCase().indexOf(filter) > -1
        //             || name.innerHTML.toUpperCase().indexOf(filter) > -1) {
        //             tr[i].style.display = "";
        //         } else {
        //             tr[i].style.display = "none";
        //         }
        //     }
        // }
        //console.log("$studentAllList",$studentAllList);

        _filterStudentList = $studentAllList.filter(function (obj) {
            // console.log(obj);
            //有些還不會有僑編，轉成空字串避免後面toUpperCase出錯
            if( obj.overseas_student_id == null)
                obj.overseas_student_id='';
            //console.log("value===",obj["student_misc_data"].overseas_student_id);
            //console.log("type===",typeof(obj["student_misc_data"].overseas_student_id));

            // 搜尋 報名序號、姓名、email、僑編
            return ( obj.user_id.toString().toUpperCase().indexOf(filter) > -1 ||
                obj.name.toUpperCase().indexOf(filter) > -1 ||
                obj.email.toUpperCase().indexOf(filter) > -1  ||
                obj.overseas_student_id.toUpperCase().indexOf(filter) > -1);
        });



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
                callback: function(json, pagination) {
                    _studentListTamplate(json);
                    // $editStudentInfoBtn = $('.btn-editStudentInfo'); // 新增學生資料編輯按鈕的觸發事件（開啟 Modal）
                    // $editStudentInfoBtn.on('click', _handleEditStudentInfo);
                }
            });
        }

        $.bootstrapSortable(true); // 啟用列表排序功能
        // $editStudentInfoBtn = $('.btn-editStudentInfo'); // 新增學生資料編輯按鈕的觸發事件（開啟 Modal）
        // $editStudentInfoBtn.on('click', _handleEditStudentInfo);

    }

})();