
var usersModule = angular.module('fwrk.users', []);

usersModule.service('Users', function($http) {

    return {
        all: function() {
           // console.log("all");
            return $http.get('/api/users').then(function(userList) {
                return userList.data;
            });
        },
        add: function(newUser) {
            console.log(newUser);
            return $http({
                method: 'post',
                url: '/api/adminusers',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
           homeadd: function(newUser) {
            return $http({
                method: 'post',
                url: '/api/users/home',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
         login: function(newUser) {
            return $http({
                method: 'post',
                url: '/api/users/login',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        remove: function(usr) {
            console.log(usr);
            return $http({
                method: 'post',
                url: '/api/deleteuser',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        update: function(usr) {
            return $http({
                method: 'post',
                url: '/api/edituserdata',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        singledata: function(id) {
            console.log(id);
            return $http({
                method: 'post',
                url: '/api/adminfetchuserdata',
                data: id
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        changepass: function(newUser) {
                    console.log("module");
                    console.log(newUser);
                return $http({
                    method: 'post',
                    url: '/api/change_passw',
                    data: newUser
                }).then(function(res) {
                    // return the new post
                    return res.data;
                }).catch(function(err) {
                    console.error('Something went wrong adding the post!');
                    console.error(err);
                    return err;
                });
                },
       uploadimage: function(image) {
            var fd = new FormData();
            fd.append("file", image);
            console.log(fd);
console.log(image);
            return $http({
                method: 'post',
                url: '/api/uploaduserimage',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function(res) {
                console.log(res)
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
                 userForgot: function(forUser) {
                    //console.log("module");
                    //console.log(forUser);
                return $http({
                    method: 'post',
                    url: '/api/forgetpass',
                    data: forUser
                }).then(function(res) {
                    // return the new post
                    return res.data;
                }).catch(function(err) {
                    console.error('Something went wrong adding the post!');
                    console.error(err);
                    return err;
                });
                },   
                
            profileupdate: function(usr) {
            console.log(usr);
            return $http({
                method: 'post',
                url: '/api/editusrdetailsweb',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        addService: function(newService) {
            console.log(newService);
            //return false;
            return $http({
                method: 'post',
                url: '/api/serviceuser',
                data: newService
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        removeservice: function(ser) {
            console.log(ser);
            return $http({
                method: 'post',
                url: '/api/deleteuserservice',
                data: ser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
         adminForgot: function(forUser) {
                    //console.log("module");
                    //console.log(forUser);
                return $http({
                    method: 'post',
                    url: '/api/forgetpassword',
                    data: forUser
                }).then(function(res) {
                    // return the new post
                    return res.data;
                }).catch(function(err) {
                    console.error('Something went wrong adding the post!');
                    console.error(err);
                    return err;
                });
                },  
                
        changePassword: function(newUser) {
                return $http({
                    method: 'post',
                    url: '/api/changePassword',
                    data: newUser
                }).then(function(res) {
                    // return the new post
                    return res.data;
                }).catch(function(err) {
                    console.error('Something went wrong adding the post!');
                    console.error(err);
                    return err;
                });
                }
        
    }
});