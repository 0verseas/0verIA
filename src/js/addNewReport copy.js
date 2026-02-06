(()=>{
    const $paginationContainer = $('#pagination-container'); // 分頁器區域
    const $applyList = $('#apply-list') // 請求列表
    const $applyModal = $('#editApplyModal'); // 請求編輯模板
    const $newBtn = $('#new-btn'); // 新增請求按鈕

    // 請求編輯模板物件
    const $applyTitle = $('#applyModalHeader'); // 通報模板的Title
    // const $actionSelector = $('#action-selector'); // 動作選擇選項
    // const $systemSelector = $('#system-selector'); // 學制選擇選項
    // const $typeSelector = $('#type-selector'); // 類型選擇選項
    // const $groupSelector = $('#group-selector'); // 類組選擇選項
    // const $departmentTitle = $('#department-title') // 請求之核定系名
    // const $applyDetailedInput = $('.apply-detailed-input'); // 請求之詳細資訊輸入區域
    const $returnReason = $('.return-reason');
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
    // 單招通報資料欄位
    const $reportDate = $('#reportDate');
    const $academicYearSelector = $('#academicYear');
    const $phaseSelector = $('#phase');
    const $reportFrequency = $('#reportFrequency');
    const $admissionYearSelector = $('#admissionYear');
    const $admissionQuotaSourceSelector = $('#admissionQuotaSource');
    const $reportTitle = $('#reportTitle');
    const $applyStartDate = $('#applyStartDate');
    const $applyEndDate = $('#applyEndDate');
    const $releaseDate = $('#releaseDate');
    const $independentAdmissionApprovalDocNumber = $('#independentAdmissionApprovalDocNumber');
    const $memo = $('#memo');
    const $applicantName = $('#applicantName');
    const $applicantJobTitle = $('#applicantJobTitle');
    const $applicantPhone = $('#applicantPhone');
    const $applicantUnit = $('#applicantUnit');
    const $applicantEmail = $('#applicantEmail');
    const $uploadFileArea = $('#uploadFileArea');

    // 單招通報操作按鈕
    const $saveBtn = $('#save-btn'); // 儲存按鈕
    const $appliedBtn = $('#applied-btn'); // 發送按鈕
    const $deleteBtn = $('#delete-btn'); // 刪除按鈕

    // 編輯模板上傳檔案相關物件
    const $uploadedFileArea = document.getElementById('uploadedFileArea');
    const $uploadFileBtn = $('#file-upload');
    const $deleteFileBtn = $('.delete-file');
    const $imgModal = $('#img-modal');
    const $imgModalBody= $('#img-modal-body');

    // 中文名稱陣列 方便 代碼轉換
    // const action_array = ['','新增系所','更改系名','更換類組','合併系所'];
    // const system_array = ['','學士班','港二技','碩士班','博士班'];
    // const type_array = ['一般系所','重點產業系所','國際專修部'];
    // const group_array = ['','第一類組','第二類組','第三類組'];

    const currentYear = env.year;
    const year_array = Array.from({ length: 5}, (_, index) => (currentYear -index) - 1911);
    // console.log(year_array);
    const phase_array = ['第一階段（2/28前放榜）', '第二階段（8/1後放榜）'];
    const admission_year_array = [env.year + '年秋季入學', env.year + '年春季入學'];
    const admission_quota_source_array = [(env.year - 1911) + '學年港澳僑總額', ((env.year - 1) - 1911) + '學年港澳僑總額'];

    class applyData{
        constructor({
            id = 0,
            // action_id,
            // system_id,
            // dept_type,
            // group_code,
            // dept_title = null,
            // dept_id = null,
            // old_group_code = null,
            // new_group_code = null,
            // old_dept_title = null,
            // new_dept_title = null,
            // conbine_dept_id_1 = null,
            // conbine_dept_id_2 = null,
            report_date = null,
            academic_year,
            phase,
            report_frequency = null,
            admission_year,
            admission_quota_source,
            report_title = null,
            apply_start_date = null,
            apply_end_date = null,
            release_date = null,
            independent_admission_approval_doc_number = null,
            memo = null,
            applied = false,
            applicant_name = null,
            applicant_job_title = null,
            applicant_phone = null,
            applicant_unit = null,
            applicant_email = null,
        }={}){
            this.id =id;
            // this.action_id =action_id;
            // this.system_id =system_id;
            // this.dept_type =dept_type;
            // this.group_code =group_code;
            // this.dept_title =dept_title;
            // this.dept_id =dept_id;
            // this.old_group_code =old_group_code;
            // this.new_group_code =new_group_code;
            // this.old_dept_title =old_dept_title;
            // this.new_dept_title =new_dept_title;
            // this.conbine_dept_id_1 =conbine_dept_id_1;
            // this.conbine_dept_id_2 =conbine_dept_id_2;
            this.report_date = report_date;
            this.academic_year = academic_year;
            this.phase = phase;
            this.report_frequency = report_frequency;
            this.admission_year = admission_year;
            this.admission_quota_source = admission_quota_source;
            this.report_title = report_title;
            this.apply_start_date = apply_start_date;
            this.apply_end_date = apply_end_date;
            this.release_date = release_date;
            this.independent_admission_approval_doc_number = independent_admission_approval_doc_number;
            this.memo = memo;
            this.applied = applied;
            this.applicant_name = applicant_name;
            this.applicant_job_title = applicant_job_title;
            this.applicant_phone = applicant_phone;
            this.applicant_unit = applicant_unit;
            this.applicant_email = applicant_email;
        }
    }

    let applyListArray = []; // 目前請求有哪些
    let $uploadedFiles = []; // 當前請求有哪些檔案
    let currentApplyID = 0; // 當前請求的ID
    let isApplied = false; // 當前請求是否送出

    // $systemSelector.on('change',_handleSystemChoose);
    // $academicYearSelector.on('change',_handleSystemChoose);

    // $actionSelector.on('change',_handleActionChange);
    // $phaseSelector.on('change',_handleActionChange);
    // $deptList.on('change',_handleSelectDept);
    $uploadFileBtn.on('change', _handleUploadFile);
    $newBtn.on('click', _handleNew);
    $saveBtn.on('click', false, _handleSave);
    $appliedBtn.on('click', true, _handleSave);
    $deleteBtn.on('click', _handleDelete);
    $deleteFileBtn.on('click', _handleDeleteFile);
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
                    const $editApplyInfoBtn = $('.btn-editApplyInfo'); // 新增編輯按鈕的觸發事件（開啟 Modal）
                    $editApplyInfoBtn.on('click', _handleEditModalShow);
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
            listHtml += `<td><button class="btn ${buttonColor} btn-editApplyInfo same-width-button" data-id="${data.id}" id="btn-apply-edit" ${buttonStatus}>${status}</button></td>`;
            listHtml += `</tr>`;
            $applyList.append(listHtml);
        });
    }

    // 開啟編輯model
    function _handleEditModalShow() {
        // show modal
        $saveBtn.html($saveBtn.html().replace('新增請求','儲存資訊'));
        $applyModal.modal();
        // 取得 請求的id
        currentApplyID = $(this).data('id');
        // 呼叫渲染文憑成績資料事件
        _setApplyData(currentApplyID);
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

    // 渲染請求資訊到編輯模板
    function _setApplyData(id) {
        openLoading();
        School.getAddNewIndependentAdmissionReportInfo(id)
        .then((res) => {
			if(res.ok) {
				return res.json();
			} else {
				throw res;
			}
		})
        .then(async (json) => {
            // console.log(json);
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
            year_array.forEach(year => {
                $academicYearSelector.append(`<option value="${year}">${year}</option>`);
            });

            phase_array.forEach(phase => {
                $phaseSelector.append(`<option value="${phase}">${phase}</option>`);
            });

            admission_year_array.forEach(admission_year => {
                $admissionYearSelector.append(`<option value="${admission_year}">${admission_year}</option>`);
            });

            admission_quota_source_array.forEach(admission_quota_source => {
                $admissionQuotaSourceSelector.append(`<option value="${admission_quota_source}">${admission_quota_source}</option>`);
            });
            $reportDate.val(json[0].report_date);
            $academicYearSelector.val(json[0].academic_year);
            $phaseSelector.val(json[0].phase);
            $reportFrequency.val(json[0].report_frequency);
            $admissionYearSelector.val(json[0].admission_year);
            $admissionQuotaSourceSelector.val(json[0].admission_quota_source);
            $reportTitle.val(json[0].report_title);
            $applyStartDate.val(json[0].apply_start_date);
            $applyEndDate.val(json[0].apply_end_date);
            $releaseDate.val(json[0].release_date);
            $independentAdmissionApprovalDocNumber.val(json[0].independent_admission_approval_doc_number);
            $memo.val(json[0].memo);
            $applicantName.val(json[0].applicant_name);
            $applicantJobTitle.val(json[0].applicant_job_title);
            $applicantPhone.val(json[0].applicant_phone);
            $applicantUnit.val(json[0].applicant_unit);
            $applicantEmail.val(json[0].applicant_email);
            // await _handleDeptSelectorRender(json[0].system_id);
            if(json[0].return_reason) {
                $returnReason.html(`<strong>退回原因：</strong>` + json[0].return_reason);
                $returnReason.show();
            } else {
                $returnReason.html();
                $returnReason.hide();
            }

            // $systemSelector.attr('disabled',true);
            // $actionSelector.attr('disabled',true);
            // $typeSelector.attr('disabled',true);
            // $groupSelector.attr('disabled',true);
            // $departmentTitle.attr('disabled',true);
            // $deptIdInput.attr('disabled',true);
            // $oldDepeTitleInput.attr('disabled',true);
            // $newDepeTitleInput.attr('disabled',true);
            // $oldGroupCodeSelector.attr('disabled',true);
            // $newGroupCodeSelector.attr('disabled',true);
            // $conbineDeptIdInput1.attr('disabled',true);
            // $conbineDeptIdInput2.attr('disabled',true);
            $reportDate.attr('disabled',true);
            $academicYearSelector.attr('disabled',true);
            $phaseSelector.attr('disabled',true);
            $reportFrequency.attr('disabled',true);
            $admissionYearSelector.attr('disabled',true);
            $admissionQuotaSourceSelector.attr('disabled',true);
            $reportTitle.attr('disabled',true);
            $applyStartDate.attr('disabled',true);
            $applyEndDate.attr('disabled',true);
            $releaseDate.attr('disabled',true);
            $independentAdmissionApprovalDocNumber.attr('disabled',true);
            $memo.attr('disabled',true);
            $appliedBtn.attr('disabled',true).hide();
            $deleteBtn.attr('disabled',true).hide();
            $saveBtn.html($saveBtn.html().replace('新增請求','儲存資訊'));
            // console.log(123);

            const $applied = (json[0].applied_at != null);
            // $applyDetailedInput.show();
            if($applied){
                isApplied = true;
                $saveBtn.attr('disabled',true).hide();
                $appliedBtn.attr('disabled',true).hide();
                $deleteBtn.attr('disabled',true).hide();
                $uploadFileBtn.attr('disabled',true);
                $deleteFileBtn.attr('disabled',true).hide();

                $('.btn-upload').hide();
                if(json[0].completed_at != null){
                    $applyTitle.html(`<i class="text-success fa fa-check" aria-hidden="true"> 處理完畢</i>`);
                } else {
                    $applyTitle.html(`<i class="text-warning fa fa-hourglass-half" aria-hidden="true"> 等候處理</i>`);
                }
            } else {
                if(json[0].returned_at != null) {
                    $applyTitle.html(`<i class="text-danger fa fa-exclamation-circle" aria-hidden="true"> 退回待處理</i>`);
                } else {
                    $applyTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 尚未發送</i>`);
                }
                $saveBtn.attr('disabled',false).show();
                $appliedBtn.attr('disabled',false).show();
                $deleteBtn.attr('disabled',false).show();
                $uploadFileBtn.attr('disabled',false);
                $deleteFileBtn.attr('disabled',false).show();
                $uploadFileArea.show();
                $saveBtn.html($saveBtn.html().replace('新增請求','儲存資訊'));
                $('.btn-upload').show();
            }
            // _handleActionChange();
            $uploadedFiles = json[1];
		}).then(()=>{
            _handleRenderFile();
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

    // 打開請求新增表格
    async function _handleNew() {
        // init modal
        // $systemSelector.val("-1");
        // $actionSelector.val("-1");
        // $typeSelector.val("-1");
        // $groupSelector.val("-1");
        // $systemSelector.attr('disabled',false);
        // $groupSelector.attr('disabled',false);
        // $actionSelector.attr('disabled',true);
        // $typeSelector.attr('disabled',true);
        // $departmentTitle.attr('disabled',false);

        $academicYearSelector.val("-1");
        $phaseSelector.val("-1");
        $admissionYearSelector.val("-1");
        $admissionQuotaSourceSelector.val("-1");
        $reportDate.attr('disabled',false);
        $academicYearSelector.attr('disabled',false);
        $phaseSelector.attr('disabled',false);
        $reportFrequency.attr('disabled',false);
        $admissionYearSelector.attr('disabled',false);
        $admissionQuotaSourceSelector.attr('disabled',false);
        $reportTitle.attr('disabled',false);
        $applyStartDate.attr('disabled',false);
        $applyEndDate.attr('disabled',false);
        $releaseDate.attr('disabled',false);
        $independentAdmissionApprovalDocNumber.attr('disabled',false);
        $memo.attr('disabled',false);

        isApplied = false;
        currentApplyID = '';
        // currentStudentDatID = '';

        // $departmentTitle.val('');
        // $deptIdInput.val('');
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 月份 +1，補零
        const day = today.getDate().toString().padStart(2, '0'); // 日期補零
        const formattedDate = `${year}/${month}/${day}`; // 格式化為 年/月/日

        $reportDate.val(formattedDate);
        $reportFrequency.val('');
        $reportTitle.val('');
        $applyStartDate.val('');
        $applyEndDate.val('');
        $releaseDate.val('');
        $independentAdmissionApprovalDocNumber.val('');
        $memo.val('');
        $applicantName.val('');
        $applicantJobTitle.val('');
        $applicantPhone.val('');
        $applicantUnit.val('');
        $applicantEmail.val('');
        $uploadedFileArea.innerHTML = '';
        // $oldDepeTitleInput.val('');
        // $newDepeTitleInput.val('');
        // $oldGroupCodeSelector.val('');
        // $newGroupCodeSelector.val('');
        // $conbineDeptIdInput1.val('');
        // $conbineDeptIdInput2.val('');
        $returnReason.html('');
        $saveBtn.html($saveBtn.html().replace('儲存資訊','新增請求'));
        $applyTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 新增請求</i>`);

        $returnReason.hide();
        // $applyDetailedInput.hide();
        $uploadFileArea.hide();
        $saveBtn.attr('disabled',false).show();
        $appliedBtn.attr('disabled',false).hide();
        $deleteBtn.attr('disabled',false).hide();

        // let Year = new Date().getFullYear();
        $reportDate.datepicker({
            updateViewDate: true, // 會自動避免並修正直接輸入錯誤/無效的月/日，例：不是潤年的時候輸入2月29日，設true會自動跳下一天到3月1日
            autoclose: true, // 選完會自動關閉選擇器
            startView: 2, // 以個位數年份單位開始瀏覽
            maxViewMode: 3, // 最高以10年單位瀏覽年份
            immediateUpdates: true, // 只要選了其中一個項目，立即刷新欄位的年/月/日的數字
            // defaultViewDate: {year: (Year-18)}, // 預設選項是 18歲
            startDate: '0y', // 當前年份-121y
            endDate: '+3y' // 當前年份-9y
        });
        $applyStartDate.datepicker({
            updateViewDate: true, // 會自動避免並修正直接輸入錯誤/無效的月/日，例：不是潤年的時候輸入2月29日，設true會自動跳下一天到3月1日
            autoclose: true, // 選完會自動關閉選擇器
            startView: 2, // 以個位數年份單位開始瀏覽
            maxViewMode: 3, // 最高以10年單位瀏覽年份
            immediateUpdates: true, // 只要選了其中一個項目，立即刷新欄位的年/月/日的數字
            // defaultViewDate: {year: (Year-18)}, // 預設選項是 18歲
            startDate: '0y', // 當前年份-121y
            endDate: '+3y' // 當前年份-9y
        });
        $applyEndDate.datepicker({
            updateViewDate: true,
            autoclose: true,
            startView: 2,
            maxViewMode: 3,
            immediateUpdates: true,
            // defaultViewDate: {year: (Year-18)}, // 預設選項是 18歲
            startDate: '0y',
            endDate: '+3y'
        });
        $releaseDate.datepicker({
            updateViewDate: true,
            autoclose: true,
            startView: 2,
            maxViewMode: 3,
            immediateUpdates: true,
            // defaultViewDate: {year: (Year-18)}, // 預設選項是 18歲
            startDate: '0y',
            endDate: '+3y'
        });

        year_array.forEach(year => {
            $academicYearSelector.append(`<option value="${year}">${year}</option>`);
        });

        phase_array.forEach(phase => {
            $phaseSelector.append(`<option value="${phase}">${phase}</option>`);
        });

        admission_year_array.forEach(admission_year => {
            $admissionYearSelector.append(`<option value="${admission_year}">${admission_year}</option>`);
        });

        admission_quota_source_array.forEach(admission_quota_source => {
            $admissionQuotaSourceSelector.append(`<option value="${admission_quota_source}">${admission_quota_source}</option>`);
        });
        // show modal
        $applyModal.modal();




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

    // 請求儲存事件
    function _handleSave(event) {
        let data = new applyData({
            // action_id: $actionSelector.val(),
            report_date: $reportDate.val(),
            academic_year: $academicYearSelector.val(),
            // system_id: $systemSelector.val(),
            phase: $phaseSelector.val(),
            // dept_type: $typeSelector.val(),
            report_frequency: $reportFrequency.val(),
            admission_year: $admissionYearSelector.val(),
            // group_code: $groupSelector.val(),
            admission_quota_source: $admissionQuotaSourceSelector.val(),
            // dept_title: $departmentTitle.val(),
            report_title: $reportTitle.val(),
            apply_start_date: $applyStartDate.val(),
            apply_end_date: $applyEndDate.val(),
            release_date: $releaseDate.val(),
            independent_admission_approval_doc_number: $independentAdmissionApprovalDocNumber.val(),
            memo: $memo.val(),
            applicant_name: $applicantName.val(),
            applicant_job_title: $applicantJobTitle.val(),
            applicant_phone: $applicantPhone.val(),
            applicant_unit: $applicantUnit.val(),
            applicant_email: $applicantEmail.val(),
        });
        // console.log(event.data);

        if (currentApplyID != '') {
            data.id = currentApplyID;
            data.applied = event.data;
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

        // console.log(data);

        openLoading();
        School.saveAddNewIndependentAdmissionReportInfo(data)
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
            err.json && err.json().then((data) => {
                console.error(data);
                swal({title:data.messages[0], confirmButtonText:'確定', type:'error'});
            });
            stopLoading();
        });
    }

    // 請求刪除事件
    function _handleDelete() {
        if(confirm('確定要刪除此請求？')){
            openLoading();
            School.deleteAddNewIndependentAdmissionReport(currentApplyID)
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
                err.json && err.json().then((data) => {
                    console.error(data);
                    swal({title:data.messages[0], confirmButtonText:'確定', type:'error'});
                });
                stopLoading();
            });
        }
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
            //偵測是否超過4MB
            if(sizeConversion(fileList[i].size,4)){
                swal({title:`${fileList[i].name}檔案過大，檔案大小不能超過4MB`, confirmButtonText:'確定', type:'error'}).then(() => {
                    return;
                });
            }
            sendData.append('files[]', fileList[i]);
        }

        // console.log(currentApplyID);

        openLoading();
        School.uploadAddNewIndependentAdmissionReportFile(currentApplyID, sendData)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            // console.log(json);
            $uploadedFiles = json;


        })
        .then(()=>{
            _handleRenderFile();
        })
        .then(()=>{
            swal({title:`上傳成功`, confirmButtonText:'確定', type:'success'}).then(() => {
                // location.reload();
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

    // 檔案渲染事件
    function _handleRenderFile() {
        // console.log($uploadedFiles);
        let uploadedAreaHtml = '';
        $uploadedFiles.forEach((file) => {
            const fileType = _getFileType(file.split('.')[1]);
            if(fileType === 'img'){
                uploadedAreaHtml += `
                    <img
                        class="img-thumbnail"
                        src="${env.baseUrl}/independent-admission/report/file/${currentApplyID}/${file}"
                        data-toggle="modal"
                        data-filename="${file}"
						data-target=".img-modal"
                        data-filetype="img"
                        data-filelink="${env.baseUrl}/independent-admission/report/file/${currentApplyID}/${file}"
                    />
                `
            } else {
                uploadedAreaHtml += `
					<div
						class="img-thumbnail non-img-file-thumbnail"
						data-toggle="modal"
						data-target=".img-modal"
						data-filelink="${env.baseUrl}/independent-admission/report/file/${currentApplyID}/${file}"
						data-filename="${file}"
                        data-filetype="${fileType}"
						data-icon="fa-file-${fileType}-o"
					>
						<i class="fa fa-file-${fileType}-o" data-filename="${file}" data-icon="fa-file-${fileType}-o" aria-hidden="true"></i>
					</div>
				`;
            }
        })
        $uploadedFileArea.innerHTML = uploadedAreaHtml;

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

        $deleteFileBtn.attr({
            'filetype': fileType,
            'filename': fileName,
        });

    }

    // 檔案刪除事件
    function _handleDeleteFile() {
        let fileName = $deleteFileBtn.attr('filename');
        if(confirm('確定要刪除此檔案？')){
            openLoading();
            School.deleteAddNewIndependentAdmissionReportFile(currentApplyID,fileName)
            .then((res) => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw res;
                }
            })
            .then((json) => {
                // console.log(json);
                $uploadedFiles = json;
            })
            .then(()=>{
                _handleRenderFile();
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

})();