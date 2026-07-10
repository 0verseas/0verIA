(()=>{

	/**
	 * cache DOM
	 */

	// 學校資料
	const $schoolInfoForm = $('#form-schoolData');
	const $schoolId = $schoolInfoForm.find('#schoolId');
	const $title = $schoolInfoForm.find('#title');
	const $engTitle = $schoolInfoForm.find('#engTitle');
	// 單獨招收僑生（單招）
	const $hasTestSelfEnrollment = $schoolInfoForm.find('#hasTestSelfEnrollment');
    const $testSelfEnrollmentArea = $('#testSelfEnrollmentContent'); // 您需要包裹一個容器 ID
	const $approvalNoOfSelfEnrollment = $schoolInfoForm.find('#approvalNoOfSelfEnrollment');
	const $approvalDocOfSelfEnrollment = $schoolInfoForm.find('#uploadedApprovalDocOfSelfEnrollmentArea');
	const $approvalDocOfSelfEnrollmentUrl = $schoolInfoForm.find('#approvalDocOfSelfEnrollmentUrl');
	const $approvalNoOfTestSelfEnrollment = $schoolInfoForm.find('#approvalNoOfTestSelfEnrollment');
	const $approvalDocOfTestSelfEnrollment = $schoolInfoForm.find('#uploadedApprovalDocOfTestSelfEnrollmentArea');
	const $approvalDocOfTestSelfEnrollmentUrl = $schoolInfoForm.find('#approvalDocOfTestSelfEnrollmentUrl');

	// Button
	const $saveSchoolDataBtn = $schoolInfoForm.find('#btn-save');
	const $lockschoolDataBtn = $schoolInfoForm.find('#btn-lock-school');
	const $uploadApprovalDocOfSelfEnrollmentBtn = $('#approval-doc-of-self-enrollment-upload');
    const $uploadApprovalDocOfTestSelfEnrollmentBtn = $('#approval-doc-of-test-self-enrollment-upload');
    const $deleteSchoolDataFileBtn = $('#delete-school-data-file-btn'); // 刪除檔案按鈕
	const $imgModal = $('#img-modal'); // 顯示檔案模板
	const $uploadApprovalDocOfSelfEnrollmentArea = $('#uploadApprovalDocOfSelfEnrollmentArea'); // 上傳教育部資格審查公文檔案欄位
    const $uploadApprovalDocOfTestSelfEnrollmentArea = $('#uploadApprovalDocOfTestSelfEnrollmentArea'); // 上傳僑委會資格審查公文檔案欄位
	const $uploadedApprovalDocOfSelfEnrollmentArea = document.getElementById('uploadedApprovalDocOfSelfEnrollmentArea'); // 擺放已上傳教育部資格審查公文檔案欄位
    const $uploadedApprovalDocOfTestSelfEnrollmentArea = document.getElementById('uploadedApprovalDocOfTestSelfEnrollmentArea'); // 擺放已上傳僑委會資格審查公文檔案欄位
	const $imgModalBody= $('#img-modal-body'); // 顯示檔案的欄位
    // form-group
	const formGroup = {
		approvalNoOfSelfEnrollmentForm: $schoolInfoForm.find('#approvalNoOfSelfEnrollmentForm input'),
		approvalNoOfTestSelfEnrollmentForm: $schoolInfoForm.find('#approvalNoOfTestSelfEnrollmentForm input'),
	};

	let uploadedSchoolDataFiles = ""; // 學校上傳檔案陣列
    let currentSchoolDataID = ""; // 當前學校資料ID
	let text = '';  // 檢查各學制是否存在

	class schoolDataList{
        constructor({
            id = 0,
            report_id = 0,
            ministry_of_education_eligibility_approval_date = null,
            ministry_of_education_eligibility_approval_doc_number = null,
            ocac_eligibility_approval_date = null,
            ocac_approval_doc_number = null,
            enrollment_announcement_eligibility_approval_date = null,
            enrollment_announcement_eligibility_approval_doc_number = null
        }={}){
            this.id = id;
            this.report_id = report_id;
            this.ministry_of_education_eligibility_approval_date = ministry_of_education_eligibility_approval_date;
            this.ministry_of_education_eligibility_approval_doc_number = ministry_of_education_eligibility_approval_doc_number;
            this.ocac_eligibility_approval_date = ocac_eligibility_approval_date;
            this.ocac_approval_doc_number = ocac_approval_doc_number;
            this.enrollment_announcement_eligibility_approval_date = enrollment_announcement_eligibility_approval_date;
            this.enrollment_announcement_eligibility_approval_doc_number = enrollment_announcement_eligibility_approval_doc_number
        }
    }

	/**
	 * init
	 */

    init();

    async function init(){
        let res = await User.isLogin();
        if(res == true) {
            _getSchoolData();
        }
    }


	/**
	 * bind event
	 */

	$hasTestSelfEnrollment.on("change", _switchTestSelfEnrollmentStatus);
    $uploadApprovalDocOfSelfEnrollmentBtn.on('change', _handleSchoolDataUploadFile);
    $uploadApprovalDocOfTestSelfEnrollmentBtn.on('change', _handleSchoolDataUploadFile);
    $deleteSchoolDataFileBtn.on('click', _handleSchoolDataDeleteFile); // 刪除單招錄取資料檔案
	$saveSchoolDataBtn.on("click", false, _handelSchoolDataSave);
	// $lockschoolDataBtn.on("click", _lockschool);
    $('body').on('click', '.img-thumbnail', _handleSchoolDataShowFile); // 顯示單招錄取資料檔案

	function _switchTestSelfEnrollmentStatus() { // 切換「單獨招收僑生（單招）」狀態
        // 修改為：切換整個區塊的「顯示/隱藏」
        if ($hasTestSelfEnrollment.prop('checked')) {
            $testSelfEnrollmentArea.slideDown(); // 展開顯示
            _handleSchoolDataRenderFile();
        } else {
            $testSelfEnrollmentArea.slideUp();   // 縮回隱藏
            $uploadedApprovalDocOfTestSelfEnrollmentArea.innerHTML = '';
        }
	}

	// 整理 form 資料
	function _getFormData() {

		let data = new FormData();

        // 永遠傳送：一般單招文號
        data.append('approval_no_of_self_enrollment', $('#approvalNoOfSelfEnrollment').val());
        data.append('has_test_self_enrollment', +$hasTestSelfEnrollment.prop('checked'));

        // 條件式傳送：只有在勾選 (isChecked === 1) 時，才附加試辦專案資料
        if ($hasTestSelfEnrollment.prop('checked')) {
            data.append('approval_no_of_test_self_enrollment', $('#approvalNoOfTestSelfEnrollment').val());
        }

		return data;
	}

	// 檢查表單要求
	function _validateForm() {
        let check = true;
        if (!_validateNotEmpty($approvalNoOfSelfEnrollment)) {formGroup.approvalNoOfSelfEnrollmentForm.addClass("is-invalid"); check = false}

        if ($hasTestSelfEnrollment.prop("checked")) {
			if (!_validateNotEmpty($approvalNoOfTestSelfEnrollment)) {formGroup.approvalNoOfTestSelfEnrollmentForm.addClass("is-invalid"); check = false}
		}

        return check;
	}

	// 檢查 form 是否為有值
	function _validateNotEmpty(el) {
		return el.val() !== "";
	}

	// 送出表單
	function _handelSchoolDataSave() {
		let form;
		// init highlight
		for(form in formGroup) {
			formGroup[form].removeClass("is-invalid");
		}

		let formResult = _validateForm();

		if (!formResult) {
			swal({title:"有欄位輸入錯誤，請重新確認。", confirmButtonText:'確定', type:'error'});
			return;
		}

		let sendData = _getFormData();
		sendData.append('confirmed', '0');

		// window.API._setLoading();
		sendData.forEach(function(value, key) {
			console.log(key, value);
		});

        openLoading();
		School.saveSchoolData(sendData).then(function(res) {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        }).then(() => {
			swal({title:"儲存成功", confirmButtonText:'確定', type:'success'}).then(() => {
				location.reload();
			});
            stopLoading();
		}).catch((err) => {
            err.json && err.json().then((data) => {
                swal({title:data.messages[0], confirmButtonText:'確定', type:'warning'}).then(() => {
			    	// location.reload();
			    });
            });
            stopLoading();
        });
	}

	// 鎖定表單
	async function _lockschool() {
		if (await _confirmExec("提醒您：<br \>確認後就無法再更改「學校資料」")) {
			// init highlight
			let form;
			for (form in formGroup) {
				formGroup[form].removeClass("is-invalid");
			}

			let formResult = _validateForm();

			if (!formResult) {
				swal({title:"有欄位輸入錯誤，請重新確認。", confirmButtonText:'確定', type:'error'}).then(() => {
					return;
				});
			}

			let sendData = _getFormData();
			sendData.append('confirmed', '1');

			openLoading();
			School.setSchoolInfo(sendData).then(function(res) {
                if(res.ok) {
                    return res.json();
                } else {
                    throw res.status;
                }
            }).then(() => {
				swal({title:"鎖定成功", confirmButtonText:'確定', type:'success'}).then(() => {
					location.reload();
				});

				stopLoading();
			});
		}
	}

	// 擺放學校資料
	function _setSchoolData(schoolData) {
        currentSchoolDataID = schoolData.id;
		$title.val(schoolData.title);
		$engTitle.val(schoolData.eng_title);
		// 單獨招收僑生（單招）
		$hasTestSelfEnrollment.prop("checked", schoolData.has_test_self_enrollment);
		$approvalNoOfSelfEnrollment.val(schoolData.approval_no_of_self_enrollment);
		$approvalNoOfTestSelfEnrollment.val(schoolData.approval_no_of_test_self_enrollment);
	}

	// init
	function _getSchoolData() {
		School.getSchoolData().then(function(res) {
            if(res.ok) {
                return res.json();
            } else {
                throw res.status;
            }
        }).then((json) => {
			// 處理擺放學校資料
			_setSchoolData(json);
			if (json.review_at != null) { // 已鎖定
				document.getElementById("btn-save").disabled = true;
				// $('#btn-lock-school').removeClass('btn-danger').addClass('btn-success').prop('disabled', true).text('已鎖定')
			}
            $uploadedSchoolDataFiles = json.files;
		}).then((json) => {
            _handleSchoolDataRenderFile();
            _switchTestSelfEnrollmentStatus()
        });;
	}

	async function _confirmExec(msg) {
        return swal({
            title: msg,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: "確認",
            cancelButtonText: "取消",
            reverseButtons: true
        })
        .then(() => {
            return true;
        })
        .catch(async(err) => {
            await swal({title: "已取消執行", type: 'success', confirmButtonText: "確定", allowOutsideClick: false});
            // location.reload();
            Loading.stop();
            return;
        })
    }

	// 處理單招錄取上傳檔案
    function _handleSchoolDataUploadFile(event) {
        // 可以一次上傳多個檔案 所以先取得遇上傳檔案清單
        currentFileID = $(this).data('id'); // 獲取 data-id

        const fileList = this.files;
        // 沒有上傳檔案 直接return
		if(fileList.length <= 0){
			return;
		}
        // 將檔案放到 FormData class中 方便後續request傳送檔案
		let sendData = new FormData();

        for (let i = 0; i < fileList.length; i++) {
            // 偵測是否超過8MB
            if(sizeConversion(fileList[i].size,8)){
                swal({title:`${fileList[i].name}檔案過大，檔案大小不能超過8MB`, confirmButtonText:'確定', type:'error'}).then(() => {
                    return;
                });
            }
            sendData.append('files[]', fileList[i]);
        }

        openLoading();
        // 上傳檔案
        School.uploadSchoolDataFile(currentSchoolDataID, currentFileID, sendData)
        .then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then((json) => {
            $uploadedSchoolDataFiles = json;
        })
        .then(()=>{
            _handleSchoolDataRenderFile();
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

    // 處理單招錄取檔案渲染
    function _handleSchoolDataRenderFile() {
        // 兩個區塊各自的 HTML 累積字串
        let uploadedApprovalDocOfSelfEnrollmentAreaHtml = '';
        let uploadedApprovalDocOfTEstSelfEnrollmentAreaHtml = '';

        $uploadedSchoolDataFiles.forEach((file) => {
            // 檔名格式：01_亂數.pdf / 02_亂數.jpg /
            const fileType = _getFileType(file.split('.').pop()); // 取副檔名
            // const fileType = _getFileType(file.split('.')[1]);
            const filePrefix = file.split('_')[0];

            // 產生這個檔案的 HTML
            let html = '';
            if (fileType === 'img') {
                html = `
                    <img
                        class="img-thumbnail"
                        src="${env.baseUrl}/independent-admission/schools/file/${currentSchoolDataID}/${file}"
                        data-toggle="modal"
                        data-filename="${file}"
                        data-target=".img-modal"
                        data-filetype="img"
                        data-filelink="${env.baseUrl}/independent-admission/schools/file/${currentSchoolDataID}/${file}"
                    />
                `;
            } else {
                html = `
                    <div
                        class="img-thumbnail non-img-file-thumbnail"
                        data-toggle="modal"
                        data-target=".img-modal"
                        data-filelink="${env.baseUrl}/independent-admission/schools/file/${currentSchoolDataID}/${file}"
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

            // 依照檔名前綴，累加到對應的「區域 HTML 變數」
            switch (filePrefix) {
                case '01':
                    uploadedApprovalDocOfSelfEnrollmentAreaHtml += html;
                    break;
                case '02':
                    uploadedApprovalDocOfTEstSelfEnrollmentAreaHtml += html;
                    break;
                default:
                    break;
            }
        });

        // 把兩個區塊都渲染出來（有檔案就有內容、沒檔案就是空字串）
        $uploadedApprovalDocOfSelfEnrollmentArea.innerHTML = uploadedApprovalDocOfSelfEnrollmentAreaHtml;
        $uploadedApprovalDocOfTestSelfEnrollmentArea.innerHTML = uploadedApprovalDocOfTEstSelfEnrollmentAreaHtml;
    }

    // 處理檔案打開顯示
    function _handleSchoolDataShowFile(){

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

        $deleteSchoolDataFileBtn.attr({
            'filetype': fileType,
            'filename': fileName,
         });

    }

    // 處理檔案刪除
    function _handleSchoolDataDeleteFile() {
        let fileName = $deleteSchoolDataFileBtn.attr('filename');
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
                School.deleteSchoolDataFile(currentSchoolDataID,fileName)
                .then((res) => {
                    if(res.ok) {
                        return res.json();
                    } else {
                        throw res;
                    }
                })
                .then((json) => {
                    // console.log(json);
                    $uploadedSchoolDataFiles = json;
                })
                .then(()=>{
                    _handleSchoolDataRenderFile();
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
})();
