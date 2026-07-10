var School = (function () {

    var baseUrl = env.baseUrl;

    function getSchoolData() {
		// _setLoading();
		return fetch(baseUrl + '/independent-admission/schools/me/histories/latest', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function saveSchoolData(data) {
		// _setLoading();
		// console.log(data);
		return fetch(baseUrl + '/independent-admission/schools/me/histories', {
			method: 'POST',
			body: data,
			credentials: 'include'
		});
	}

	function uploadSchoolDataFile(schoolId,fileId,data){
		return fetch(baseUrl + `/independent-admission/schools/file/${schoolId}/${fileId}`, {
			method: 'POST',
			body: data,
			credentials: 'include'
		});
	}

	function deleteSchoolDataFile(schoolId,fileName){
		return fetch(baseUrl + `/independent-admission/schools/file/${schoolId}/${fileName}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

    function getIndependentAdmissionReportList(){
		return fetch(baseUrl + `/independent-admission/report`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function getIndependentAdmissionReportData(reportId){
		return fetch(baseUrl + `/independent-admission/report/${reportId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function saveIndependentAdmissionReportData(data){
		return fetch(baseUrl + `/independent-admission/report`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		});
	}

	function deleteIndependentAdmissionReportData(reportId){
		return fetch(baseUrl + `/independent-admission/report/${reportId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function uploadIndependentAdmissionReportFile(reportId,data){
		return fetch(baseUrl + `/independent-admission/report/file/${reportId}`, {
			method: 'POST',
			body: data,
			credentials: 'include'
		});
	}

	function deleteIndependentAdmissionReportFile(reportId,fileName){
		return fetch(baseUrl + `/independent-admission/report/file/${reportId}/${fileName}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function getIndependentAdmissionStudentList(reportId){
		return fetch(baseUrl + `/independent-admission/student-report/${reportId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function getIndependentAdmissionEnrollmentStudentList(reportId){
		return fetch(baseUrl + `/independent-admission/student-report/enrollment/${reportId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function getIndependentAdmissionStudentData(reportId, userId){
		return fetch(baseUrl + `/independent-admission/student-report/${reportId}/${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function getIndependentAdmissionEnrollmentData(reportId, enrollmentId){
		return fetch(baseUrl + `/independent-admission/enrollment-report/${reportId}/${enrollmentId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function saveIndependentAdmissionEnrollmentData(data){
		return fetch(baseUrl + `/independent-admission/enrollment-report`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		});
	}

	function saveIndependentAdmissionStudentData(data){
		return fetch(baseUrl + `/independent-admission/student-report`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		});
	}

	function uploadStudentDataFile(reportId,userId,data){
		return fetch(baseUrl + `/independent-admission/student-report/file/${reportId}/${userId}`, {
			method: 'POST',
			body: data,
			credentials: 'include'
		});
	}

	function uploadEnollmentDataFile(reportId,enrollmentId,fileId,data){
		return fetch(baseUrl + `/independent-admission/enrollment-report/file/${reportId}/${enrollmentId}/${fileId}`, {
			method: 'POST',
			body: data,
			credentials: 'include'
		});
	}

	function deleteStudentDataFile(reportId,userId,fileName){
		return fetch(baseUrl + `/independent-admission/student-report/file/${reportId}/${userId}/${fileName}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function deleteEnrollmentDataFile(reportId,enrollmentId,fileName){
		return fetch(baseUrl + `/independent-admission/enrollment-report/file/${reportId}/${enrollmentId}/${fileName}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function getIndependentAdmissionEnrollmentList(){
		return fetch(baseUrl + `/independent-admission/enrollment-report`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function getIndependentAdmissionEnrollmentInfo(reportId){
		return fetch(baseUrl + `/independent-admission/enrollment-report/${reportId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	// 儲存單招錄取學生資料
	function saveIndependentAdmissionEnrollmentStudentData(data){
		return fetch(baseUrl + `/independent-admission/enrollment-report/update`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		});
	}

	function deleteIndependentAdmissionEnrollmentData(enrollmentId){
		return fetch(baseUrl + `/independent-admission/enrollment-report/${enrollmentId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function uploadIndependentAdmissionEnrollmentFile(reportId,data){
		return fetch(baseUrl + `/independent-admission/enrollment/file/${reportId}`, {
			method: 'POST',
			body: data,
			credentials: 'include'
		});
	}

	function deleteIndependentAdmissionEnrollmentFile(reportId,fileName){
		return fetch(baseUrl + `/independent-admission/enrollment/file/${reportId}/${fileName}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});
	}

	function saveIndependentAdmissionEnrollmentStudentRegistrationData(data){
		return fetch(baseUrl + `/independent-admission/enrollment-report/registration-update`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		});
	}

	function getSchooIndependentAdmissionReportList() {
        return fetch(baseUrl + `/independent-admission/school-report-list`, {
            method: 'GET',
            credentials: 'include'
        });
    }

    function getSchooApplyList() {
        return fetch(baseUrl + `/admins/school-apply-list`, {
            method: 'GET',
            credentials: 'include'
        });
    }

    function updateApply(data, verified) {
        return fetch(baseUrl + `/admins/update-school-apply?verified=${verified}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    function returnApply(data) {
        return fetch(baseUrl + `/admins/return-school-apply`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    function executeApply(id) {
        return fetch(baseUrl + `/admins/execute-school-apply?id=${id}`, {
            method: 'GET',
            credentials: 'include'
        });
    }

    function completeApply(id) {
        return fetch(baseUrl + `/admins/complete-school-apply?id=${id}`, {
            method: 'GET',
            credentials: 'include'
        });
    }

    function checkApply(id) {
        return fetch(baseUrl + `/admins/check-school-apply?id=${id}`, {
            method: 'GET',
            credentials: 'include'
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw res.status;
            }
        }).catch((err) => {
            if (err == 401) {
                swal({title: `警告`, text: '請先登入！', type:"warning", confirmButtonText: '確定', allowOutsideClick: false})
                .then((res) => {
                    location.replace('./login.html');
                    return false;
                });
            }
        });

    }

    return {
        getSchoolData, // 取得學校資料
        saveSchoolData, // 儲存學校資料
		uploadSchoolDataFile, // 上傳學校資料檔案
		deleteSchoolDataFile, // 刪除學校資料檔案
        getIndependentAdmissionReportList, //取得單招通報清冊
		getIndependentAdmissionReportData, // 取得單招通報資料
		saveIndependentAdmissionReportData, // 儲存單招通報資料
		deleteIndependentAdmissionReportData, // 刪除單招通報資料
		uploadIndependentAdmissionReportFile, // 上傳單招通報資料檔案
		deleteIndependentAdmissionReportFile, // 刪除單招通報資料檔案

		getIndependentAdmissionStudentList, // 取得學生清冊
		getIndependentAdmissionStudentData, // 取得學生資料
		saveIndependentAdmissionStudentData, //儲存學生資料
		uploadStudentDataFile, // 上傳學生資料檔案
		deleteStudentDataFile, // 刪除學生資料檔案

		getIndependentAdmissionEnrollmentList, // 取得單招錄取清冊
		getIndependentAdmissionEnrollmentData, // 取得單招錄取資料
		// getIndependentAdmissionEnrollmentInfo,
		saveIndependentAdmissionEnrollmentData, // 儲存單招錄取資料
		saveIndependentAdmissionEnrollmentStudentData, //儲存單招錄取學生資料
		deleteIndependentAdmissionEnrollmentData, // 刪除單招錄取資料
		uploadEnollmentDataFile, // 上傳單招錄取檔案
		deleteEnrollmentDataFile, // 刪除單招錄取檔案

		getIndependentAdmissionEnrollmentStudentList, // 取得已錄取的學生清冊
		saveIndependentAdmissionEnrollmentStudentRegistrationData, // 儲存已錄取的學生報到狀態

		getSchooIndependentAdmissionReportList, // 取得學校單招通報清冊 = 取得單招通報清冊？
        completeApply,
        executeApply,
        updateApply,
        returnApply,
        checkApply
    };

})();
