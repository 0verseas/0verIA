(()=>{
    // 分頁器
    const $paginationContainer = $('#pagination-container'); // 分頁器區域

    // 列表
    const $reportList = $('#report-list') // 請求列表

    // 按鈕
    const $newReportDataBtn = $('#new-report-data-btn'); // 新增請求按鈕
    const $saveReportDataBtn = $('#save-report-data-btn'); // 儲存按鈕
    const $applyReportDataBtn = $('#apply-report-data-btn'); // 發送按鈕
    const $deleteReportDataBtn = $('#delete-report-data-btn'); // 刪除按鈕
    const $uploadReportDataFileBtn = $('#upload-report-data-file');
    const $deleteReportDataFileBtn = $('#delete-report-data-file');

    // 模板
    const $reportModal = $('#edit-report-modal'); // 請求編輯模板
    const $imgModal = $('#img-modal');

    // 欄位
    const $reportModalTitle = $('#report-modal-header'); // 通報模板的Title
    const $returnReason = $('.return-reason');
    const $uploadReportDataFileArea = $('#upload-report-data-file-area');
    const $uploadedReportDataFileArea = document.getElementById('uploaded-report-data-file-area');
    const $imgModalBody= $('#img-modal-body');

    // 通報資料欄位
    const $reportDate = $('#report-date');
    const $academicYearSelector = $('#academic-year');
    const $phaseSelector = $('#phase');
    const $reportFrequency = $('#report-frequency');
    const $admissionYearSelector = $('#admission-year');
    const $admissionQuotaSourceSelector = $('#admission-quota-source');
    const $reportTitle = $('#report-title');
    const $applyStartDate = $('#apply-start-date');
    const $applyEndDate = $('#apply-end-date');
    const $releaseDate = $('#release-date');
    const $independentAdmissionApprovalDocNumber = $('#independent-admission-approval-doc-number');
    const $memo = $('#memo');
    const $applicantName = $('#applicant-name');
    const $applicantJobTitle = $('#applicant-job-title');
    const $applicantPhone = $('#applicant-phone');
    const $applicantUnit = $('#applicant-unit');
    const $applicantEmail = $('#applicant-email');

    // 通報下拉式選單資料
    const currentYear = env.year;
    const yearArray = Array.from({ length: 5}, (_, index) => (currentYear -index) - 1911);
    const phaseArray = ['第一階段（2/28前放榜）', '第二階段（8/1後放榜）'];
    const admissionYearArray = [env.year + '年秋季入學', env.year + '年春季入學'];
    const admissionQuotaSourceArray = [(env.year - 1911) + '學年港澳僑總額', ((env.year - 1) - 1911) + '學年港澳僑總額'];

    let reportListArray = []; // 目前請求有哪些
    let $uploadedReportDataFiles = []; // 當前請求有哪些檔案
    let currentReportDataID = 0; // 當前單招通報資料ID

    class reportDataList{
        constructor({
            id = 0,
            report_date = null,
            academic_year,
            phase,
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
            this.report_date = report_date;
            this.academic_year = academic_year;
            this.phase = phase;
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



    $uploadReportDataFileBtn.on('change', _handleReportDataUploadFile);
    $newReportDataBtn.on('click', _handleNewReportDataModalShow);
    $saveReportDataBtn.on('click', false, _handleReportDataSave);
    $applyReportDataBtn.on('click', true, _handleReportDataSave);
    $deleteReportDataBtn.on('click', _handleReportDataDelete);
    $deleteReportDataFileBtn.on('click', _handleReportDataDeleteFile);
    $('body').on('click', '.img-thumbnail', _handleReportDataShowFile);
    // 如果關閉已上傳檔案modal 依舊保持focus在文憑成績編輯modal上
    $imgModal.on('hidden.bs.modal', function(e){
        $('body').addClass('modal-open');
    });

    init();

    async function init(){
        let res = await User.isLogin();
        if(res == true) {
            _setReportListData();
        }
    }

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
            // console.log(json);
            reportListArray = json;

            // 進行文憑列表分頁初始化渲染工作
            $paginationContainer.pagination({
                dataSource: reportListArray,
                pageSize: 10,
                callback: function(reportListArray,pagination) {
                    _reportListTamplate(reportListArray, pagination.pageNumber);
                    const $editReportInfoBtn = $('.edit-report-data-btn'); // 新增編輯按鈕的觸發事件（開啟 Modal）
                    $editReportInfoBtn.on('click', _handleEditReportDataModalShow);
                }
            });

		})
        .then(() =>{
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
    function _reportListTamplate(datas,page) {
        // 渲染 請求列表
        $reportList.html('');
        datas.forEach(function (data, index) {
            const academicYear = data.academic_year;
            const phase = data.phase;
            const admissionYear = data.admission_year;
            const reportFrequency = data.report_frequency;
            const reportTitle = data.report_title;
            const applied_at = _formatDate(data.applied_at);
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
                    // buttonStatus = 'disabled';
                }
                // buttonStatus = 'disabled';
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
            listHtml += `<td>${index+1+((page-1)*10)}</td>`;
            listHtml += `<td>${academicYear}</td>`;
            listHtml += `<td>${phase}</td>`;
            listHtml += `<td>${admissionYear}</td>`;
            listHtml += `<td>${reportFrequency}</td>`;
            listHtml += `<td>${reportTitle}</td>`;
            listHtml += `<td>${applied_at}</td>`;
            listHtml += `<td><button class="btn ${buttonColor} edit-report-data-btn same-width-button" data-id="${data.id}" id="btn-report-edit" ${buttonStatus}>${status}</button></td>`;
            listHtml += `</tr>`;
            $reportList.append(listHtml);
        });
    }

    // 打開請求新增表格
    async function _handleNewReportDataModalShow() {
        // 顯示 modal
        $reportModal.modal('show');
        // 欄位預設狀態
        $academicYearSelector.empty();
        $phaseSelector.empty();
        $admissionYearSelector.empty();
        $admissionQuotaSourceSelector.empty();
        $reportDate.attr('disabled',false);
        $academicYearSelector.attr('disabled',false);
        $phaseSelector.attr('disabled',false);
        $reportFrequency.attr('disabled',true);
        $admissionYearSelector.attr('disabled',false);
        $admissionQuotaSourceSelector.attr('disabled',false);
        $reportTitle.attr('disabled',false);
        $applyStartDate.attr('disabled',false);
        $applyEndDate.attr('disabled',false);
        $releaseDate.attr('disabled',false);
        $independentAdmissionApprovalDocNumber.attr('disabled',false);
        $memo.attr('disabled',false);
        $applicantName.attr('disabled',false);
        $applicantJobTitle.attr('disabled',false);
        $applicantPhone.attr('disabled',false);
        $applicantUnit.attr('disabled',false);
        $applicantEmail.attr('disabled',false);
        currentReportDataID = '';

        // 轉換今天日期顯示
        const today = new Date();
        const year = today.getFullYear(); // 年份
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 月份 +1，補零
        const day = today.getDate().toString().padStart(2, '0'); // 日期補零
        const formattedDate = `${year}/${month}/${day}`; // 格式化為 年/月/日

        $reportDate.val(formattedDate);
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
        $uploadedReportDataFileArea.innerHTML = '';
        $returnReason.html('');
        $saveReportDataBtn.html($saveReportDataBtn.html().replace('儲存','新增'));
        $reportModalTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 建立單招通報資料</i>`);

        $returnReason.hide();
        $uploadReportDataFileArea.hide();
        $saveReportDataBtn.attr('disabled',false).show();
        $applyReportDataBtn.attr('disabled',false).hide();
        $deleteReportDataBtn.attr('disabled',false).hide();

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

        yearArray.forEach(year => {
            $academicYearSelector.append(`<option value="${year}">${year}</option>`);
        });

        phaseArray.forEach(phase => {
            $phaseSelector.append(`<option value="${phase}">${phase}</option>`);
        });

        admissionYearArray.forEach(admission_year => {
            $admissionYearSelector.append(`<option value="${admission_year}">${admission_year}</option>`);
        });

        admissionQuotaSourceArray.forEach(admission_quota_source => {
            $admissionQuotaSourceSelector.append(`<option value="${admission_quota_source}">${admission_quota_source}</option>`);
        });

        $academicYearSelector.prop('disabled', false).selectpicker('refresh');
        $phaseSelector.prop('disabled', false).selectpicker('refresh');
        $admissionYearSelector.prop('disabled', false).selectpicker('refresh');
        $admissionQuotaSourceSelector.prop('disabled', false).selectpicker('refresh');
        $academicYearSelector.parent().find('button').removeClass('bs-placeholder').removeClass('btn-light').removeClass('btn-grey').addClass('btn-white'); // 統一表單風格統一
        $phaseSelector.parent().find('button').removeClass('bs-placeholder').removeClass('btn-light').removeClass('btn-grey').addClass('btn-white'); // 統一表單風格統一
        $admissionYearSelector.parent().find('button').removeClass('bs-placeholder').removeClass('btn-light').removeClass('btn-grey').addClass('btn-white'); // 統一表單風格統一
        $admissionQuotaSourceSelector.parent().find('button').removeClass('bs-placeholder').removeClass('btn-light').removeClass('btn-grey').addClass('btn-white'); // 統一表單風格統一
    }

    // 開啟編輯model
    function _handleEditReportDataModalShow() {
        // 顯示 modal
        $reportModal.modal('show');

        // 取得 請求的id
        currentReportDataID = $(this).data('id');

        // 欄位預設狀態
        $saveReportDataBtn.html($saveReportDataBtn.html().replace('新增資料','儲存資料'));
        $academicYearSelector.empty();
        $phaseSelector.empty();
        $admissionYearSelector.empty();
        $admissionQuotaSourceSelector.empty();
        yearArray.forEach(year => {
            $academicYearSelector.append(`<option value="${year}">${year}</option>`);
        });

        phaseArray.forEach(phase => {
            $phaseSelector.append(`<option value="${phase}">${phase}</option>`);
        });

        admissionYearArray.forEach(admission_year => {
            $admissionYearSelector.append(`<option value="${admission_year}">${admission_year}</option>`);
        });

        admissionQuotaSourceArray.forEach(admission_quota_source => {
            $admissionQuotaSourceSelector.append(`<option value="${admission_quota_source}">${admission_quota_source}</option>`);
        });

        $academicYearSelector.selectpicker('refresh');
        $phaseSelector.selectpicker('refresh');
        $admissionYearSelector.selectpicker('refresh');
        $admissionQuotaSourceSelector.selectpicker('refresh');
        $saveReportDataBtn.html($saveReportDataBtn.html().replace('新增','儲存'));


        // 呼叫擺放單招通報資料
        _setReportData(currentReportDataID);
    }

    // 擺放單招通報資料
    function _setReportData(id) {
        openLoading();
        // 取得單招通報資料
        School.getIndependentAdmissionReportData(id)
        .then((res) => {
			if(res.ok) {
				return res.json();
			} else {
				throw res;
			}
		})
        .then(async (json) => {
            $uploadReportDataFileArea.show();
            $reportDate.val(json.report_date);
            $reportTitle.val(json.report_title);
            $applyStartDate.val(json.apply_start_date);
            $applyEndDate.val(json.apply_end_date);
            $releaseDate.val(json.release_date);
            $independentAdmissionApprovalDocNumber.val(json.independent_admission_approval_doc_number);
            $memo.val(json.memo);
            $applicantName.val(json.applicant_name);
            $applicantJobTitle.val(json.applicant_job_title);
            $applicantPhone.val(json.applicant_phone);
            $applicantUnit.val(json.applicant_unit);
            $applicantEmail.val(json.applicant_email);

            if(json.applied_at != null){
                $reportDate.attr('disabled',true);
                $academicYearSelector.val(json.academic_year).prop('disabled', true).selectpicker('refresh');
                $phaseSelector.val(json.phase).prop('disabled', true).selectpicker('refresh');
                $admissionYearSelector.val(json.admission_year).prop('disabled', true).selectpicker('refresh');
                $admissionQuotaSourceSelector.val(json.admission_quota_source).prop('disabled', true).selectpicker('refresh');
                $reportFrequency.attr('disabled',true);
                $reportTitle.attr('disabled',true);
                $applyStartDate.attr('disabled',true);
                $applyEndDate.attr('disabled',true);
                $releaseDate.attr('disabled',true);
                $independentAdmissionApprovalDocNumber.attr('disabled',true);
                $memo.attr('disabled',true);
                $saveReportDataBtn.attr('disabled',true).hide();
                $applyReportDataBtn.attr('disabled',true).hide();
                $deleteReportDataBtn.attr('disabled',true).hide();
                $uploadReportDataFileBtn.attr('disabled',true);
                $deleteReportDataFileBtn.attr('disabled',true).hide();
                $applicantName.attr('disabled',true);
                $applicantJobTitle.attr('disabled',true);
                $applicantPhone.attr('disabled',true);
                $applicantUnit.attr('disabled',true);
                $applicantEmail.attr('disabled',true);
                $('.btn-upload').hide();
                $academicYearSelector.parent().find('button').addClass('btn-grey').removeClass('btn-light'); // 為了風格統一 去除預設格式
                $phaseSelector.parent().find('button').addClass('btn-grey').removeClass('btn-light'); // 為了風格統一 去除預設格式
                $admissionYearSelector.parent().find('button').addClass('btn-grey').removeClass('btn-light'); // 為了風格統一 去除預設格式
                $admissionQuotaSourceSelector.parent().find('button').addClass('btn-grey').removeClass('btn-light'); // 為了風格統一 去除預設格式
                if(json.completed_at != null){
                    $reportModalTitle.html(`<i class="text-success fa fa-check" aria-hidden="true"> 處理完畢</i>`);
                } else {
                    $reportModalTitle.html(`<i class="text-warning fa fa-hourglass-half" aria-hidden="true"> 等候處理</i>`);
                }
            } else {
                $reportDate.attr('disabled',false);
                $academicYearSelector.val(json.academic_year).prop('disabled', false).selectpicker('refresh');
                $phaseSelector.val(json.phase).prop('disabled', false).selectpicker('refresh');
                $admissionYearSelector.val(json.admission_year).prop('disabled', false).selectpicker('refresh');
                $admissionQuotaSourceSelector.val(json.admission_quota_source).prop('disabled', false).selectpicker('refresh');
                $reportFrequency.attr('disabled',false);
                $reportTitle.attr('disabled',false);
                $applyStartDate.attr('disabled',false);
                $applyEndDate.attr('disabled',false);
                $releaseDate.attr('disabled',false);
                $independentAdmissionApprovalDocNumber.attr('disabled',false);
                $memo.attr('disabled',false);
                $saveReportDataBtn.attr('disabled',false).show();
                $applyReportDataBtn.attr('disabled',false).show();
                $deleteReportDataBtn.attr('disabled',false).show();
                $uploadReportDataFileBtn.attr('disabled',false);
                $deleteReportDataFileBtn.attr('disabled',false).show();
                $applicantName.attr('disabled',false);
                $applicantJobTitle.attr('disabled',false);
                $applicantPhone.attr('disabled',false);
                $applicantUnit.attr('disabled',false);
                $applicantEmail.attr('disabled',false);
                $saveReportDataBtn.html($saveReportDataBtn.html().replace('新增資料','儲存資料'));
                $('.btn-upload').show();
                $academicYearSelector.parent().find('button').removeClass('btn-grey').addClass('btn-white'); // 為了風格統一 去除預設格式
                $phaseSelector.parent().find('button').removeClass('btn-grey').addClass('btn-white'); // 為了風格統一 去除預設格式
                $admissionYearSelector.parent().find('button').removeClass('btn-grey').addClass('btn-white'); // 為了風格統一 去除預設格式
                $admissionQuotaSourceSelector.parent().find('button').removeClass('btn-grey').addClass('btn-white'); // 為了風格統一 去除預設格式
                if(json.returned_at != null) {
                    $reportModalTitle.html(`<i class="text-danger fa fa-exclamation-circle" aria-hidden="true"> 退回待處理</i>`);
                    $returnReason.html(`<strong>退回原因：</strong>` + json.return_reason);
                    $returnReason.show();
                } else {
                    $reportModalTitle.html(`<i class="text-primary fa fa-file-text" aria-hidden="true"> 編輯單招通報資料</i>`);
                    $returnReason.html();
                    $returnReason.hide();
                }
            }
            $saveReportDataBtn.html($saveReportDataBtn.html().replace('新增資料','儲存資料'));
            $uploadedReportDataFiles = json.files;
		}).then(()=>{
            _handleReportDataRenderFile();
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

    // 請求儲存事件
    async function _handleReportDataSave(event) {
        // 建立要傳送的資料欄位
        let reportData = new reportDataList({
            report_date: $reportDate.val(),
            academic_year: $academicYearSelector.val(),
            phase: $phaseSelector.val(),
            report_frequency: $reportFrequency.val(),
            admission_year: $admissionYearSelector.val(),
            admission_quota_source: $admissionQuotaSourceSelector.val(),
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

        if (currentReportDataID != '') {
            reportData.id = currentReportDataID;
            reportData.applied = event.data;
        }

        if (reportData.applied) {
            await swal({
    			title: '確定要送出通報請求嗎？',
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
        School.saveIndependentAdmissionReportData(reportData)
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

    // 請求刪除事件
    function _handleReportDataDelete() {
        swal({
			title: '確定要刪除此通報？',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#5cb85c',
			cancelButtonColor: '#dc3454',
			confirmButtonText: '確定',
			cancelButtonText: '取消',
		})
		.then((result)	=> {
            openLoading();
            if (result) {
                School.deleteIndependentAdmissionReportData(currentReportDataID)
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
            } else {
                return;
            }
        });
    }

    // 上傳檔案事件
    function _handleReportDataUploadFile(event) {
        // 可以一次上傳多個檔案 所以先取得遇上傳檔案清單

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

        openLoading();
        School.uploadIndependentAdmissionReportFile(currentReportDataID, sendData)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            $uploadedReportDataFiles = json;
        })
        .then(()=>{
            _handleReportDataRenderFile();
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

    // 檔案渲染事件
    function _handleReportDataRenderFile() {
        let uploadedAreaHtml = '';
        $uploadedReportDataFiles.forEach((file) => {
            const fileType = _getFileType(file.split('.')[1]);
            if(fileType === 'img'){
                uploadedAreaHtml += `
                    <img
                        class="img-thumbnail"
                        src="${env.baseUrl}/independent-admission/report/file/${currentReportDataID}/${file}"
                        data-toggle="modal"
                        data-filename="${file}"
						data-target=".img-modal"
                        data-filetype="img"
                        data-filelink="${env.baseUrl}/independent-admission/report/file/${currentReportDataID}/${file}"
                    />
                `
            } else {
                uploadedAreaHtml += `
					<div
						class="img-thumbnail non-img-file-thumbnail"
						data-toggle="modal"
						data-target=".img-modal"
						data-filelink="${env.baseUrl}/independent-admission/report/file/${currentReportDataID}/${file}"
						data-filename="${file}"
                        data-filetype="${fileType}"
						data-icon="fa-file-${fileType}-o"
					>
						<i class="fa fa-file-${fileType}-o" data-filename="${file}" data-icon="fa-file-${fileType}-o" aria-hidden="true"></i>
					</div>
				`;
            }
        })
        $uploadedReportDataFileArea.innerHTML = uploadedAreaHtml;

    }

    // 檔案放大顯示事件
    function _handleReportDataShowFile(){

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

        $deleteReportDataFileBtn.attr({
            'filetype': fileType,
            'filename': fileName,
        });

    }

    // 檔案刪除事件
    function _handleReportDataDeleteFile() {
        let fileName = $deleteReportDataFileBtn.attr('filename');
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
                School.deleteIndependentAdmissionReportFile(currentReportDataID,fileName)
                .then((res) => {
                    if(res.ok) {
                        return res.json();
                    } else {
                        throw res;
                    }
                })
                .then((json) => {
                    $uploadedReportDataFiles = json;
                })
                .then(()=>{
                    _handleReportDataRenderFile();
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
            } else {
                return;
            }
        });
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