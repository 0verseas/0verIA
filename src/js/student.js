var Student = (function () {

    var baseUrl = env.baseUrl;

    function getStudentList() {
        return fetch(baseUrl + `/admins/students`, {
            credentials: 'include'
        });
    }

    function getStudentInfo(UserId) { // 取得某學生詳細資料
        return fetch(baseUrl + `/admins/students/${UserId}`, {
            credentials: 'include'
        })
    }

    function getSchoolType(countryId) {
		return fetch(baseUrl + `/country-school-type?country_id=` + countryId, {
			method: 'GET'
		});
	}

    async function getCountryList() {
        // if (localStorage.countryList
			// && localStorage.countryList !== ""
			// && localStorage.countryListExpiration
			// && localStorage.countryListExpiration
			// && localStorage.countryListExpiration > new Date().getTime()) {
			// return JSON.parse(localStorage.countryList);
		// } else {
            try {
                const response = await fetch(baseUrl + `/country-lists`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                if (!response.ok) {throw response;}
                const json = await response.json();
                let group_to_values = await json.reduce(function (obj, item) {
					obj[item.id] = item.country;
					return obj;
				}, {});

				// let groups = await Object.keys(group_to_values).map(function (key) {
					// return {continent: key, country: group_to_values[key]};
				// });
//
                // localStorage.countryList = JSON.stringify(group_to_values);
                // localStorage.countryListExpiration = new Date().getTime() + (1440 * 60 * 1000);
				return group_to_values;
            } catch (e) {
				console.log(e);
			}
        // }

    }

    return {
        getStudentList,
        getStudentInfo,
        getSchoolType,
        getCountryList
    };

})();
