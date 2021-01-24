import baseApi from "./BaseApi";
const API = {
    getCosts: function() {
        return new Promise(function (resolve, reject) {
            fetch(`${baseApi}/costtype/get_cost_type`)
                .then(res => res.json())
                .then(res => {
                    if(res.success === 1) {
                        resolve(res);
                    } else {
                        reject();
                    }
                })
                .catch(err => {
                    console.log("Error occurred while getting cost types", err);
                })
        })
    }
}

export default API;