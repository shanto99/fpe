import baseApi from "./BaseApi";
import swal from "sweetalert";

const Authentication = {
    checkPrivilege: function(privilege) {
      // if(!this.isAuthenticated()) return false;
      // let user = localStorage.getItem('market-data-user');
      // user = JSON.parse(user);
      // return user.privileges.includes(privilege);
        return true;
    },
    getUserPrivileges: function () {
        if(!this.isAuthenticated()) return false;
        let user = localStorage.getItem('market-data-user');
        user = JSON.parse(user);
        return user.privileges || [];
    },
    hasPrivilege: function(previleges = []) {
        // if(!this.isAuthenticated()) return false;
        // let hasPrevilige = false;
        // let userPreviliges = this.getUserPrivileges();
        // for(let i=0; i<userPreviliges.length; i++) {
        //     let previlige = userPreviliges[i];
        //     if(previleges.includes(Number(previlige))){
        //       hasPrevilige = true;
        //       break;
        //     }
        // }
        let hasPrevilige = true;
        return hasPrevilige;
    },
    login: function(userid, password){
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            formData.append('userid', userid);
            formData.append('password', password);
            fetch(`${baseApi}/loginservice`,{
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(result => {
                    if(result.success === 1) {
                        let userData = result.userData;
                        localStorage.setItem('market-data-user', JSON.stringify(userData));
                        resolve(result);
                    } else {
                        let msg = result.msg;
                        swal(msg);
                    }

                })
                .catch(err => {
                    reject(err);
                })
        })
    },
    isAuthenticated: function() {
        return !!localStorage.getItem('market-data-user');
    },
    getAuthenticatedUser: function() {
        let user = localStorage.getItem('market-data-user');
        return JSON.parse(user);
    }
};

export default Authentication;