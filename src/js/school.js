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
        getSchoolData,
        saveSchoolData,
		// uploadSchoolDataFile,
		// deleteSchoolDataFile,
        getIndependentAdmissionReportList,
		getIndependentAdmissionReportData,
		saveIndependentAdmissionReportData,
		deleteIndependentAdmissionReportData,
		uploadIndependentAdmissionReportFile,
		deleteIndependentAdmissionReportFile,

		getIndependentAdmissionStudentList, // 取得學生清冊
		getIndependentAdmissionStudentData,
		saveIndependentAdmissionStudentData,
		uploadStudentDataFile,
		deleteStudentDataFile,

		getIndependentAdmissionEnrollmentList,
		getIndependentAdmissionEnrollmentData,
		// getIndependentAdmissionEnrollmentInfo,
		saveIndependentAdmissionEnrollmentData,
		saveIndependentAdmissionEnrollmentStudentData,
		deleteIndependentAdmissionEnrollmentData,
		uploadEnollmentDataFile,
		deleteEnrollmentDataFile,

		getIndependentAdmissionEnrollmentStudentList, // 取得已錄取的學生清冊
		saveIndependentAdmissionEnrollmentStudentRegistrationData, // 儲存已錄取的學生報到狀態

		// uploadIndependentAdmissionEnrollmentFile,
		// deleteIndependentAdmissionEnrollmentFile,

		getSchooIndependentAdmissionReportList,
        getSchooApplyList,
        completeApply,
        executeApply,
        updateApply,
        returnApply,
        checkApply
    };

})();
