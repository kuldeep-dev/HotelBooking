
var menusModule = angular.module('fwrk.menus', []);

menusModule.service('Menus', function($http){

	return {
		all: function(){
			return $http.get('/api/allmenu').then(function(room){
				return room.data;
			});
		},
		add: function(newPost){
			return $http({
				method: 'post',
				url: '/api/addmenu',
				data: newPost
			}).then(function(res){
				// return the new post
				return res.data;
			}).catch(function(err){
				console.error('Something went wrong adding the post!');
				console.error(err);
				return err;
			});
		},
                remove: function(usr) {
                        return $http({
                            method: 'post',
                            url: '/api/deletemenu',
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
                            url: '/api/editmenu',
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
                addmenuitems: function(usr) {
                        return $http({
                            method: 'post',
                            url: '/api/add_menu_item',
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
                editmenuitems: function(usr) {
                        return $http({
                            method: 'post',
                            url: '/api/edit_menu_item',
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
                deletemenusitems: function(usr) {
                        return $http({
                            method: 'post',
                            url: '/api/delete_menu_item',
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
                uploadimagemenu: function(image) {
                            var fd = new FormData();
                            fd.append("file", image);
                            return $http({
                                method: 'post',
                                url: '/api/uploadmenuimage',
                                data: fd,
                                withCredentials: true,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).then(function(res) {
                                return res.data;
                            }).catch(function(err) {
                                console.error('Something went wrong adding the post!');
                                console.error(err);
                                return err;
                            });
                    },

	};
});