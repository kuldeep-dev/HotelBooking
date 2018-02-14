
var hotel_staffModule = angular.module('fwrk.hotel_staff', []);

hotel_staffModule.service('Hotel_staff', function($http){

	return {
		allstaff: function(){
			return $http.get('/api/allstaff').then(function(room){
				return room.data;
			});
		},
		addstaffdata: function(newPost){
			return $http({
				method: 'post',
				url: '/api/addstaff_data',
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
                deletestaff: function(usr) {
                        return $http({
                            method: 'post',
                            url: '/api/delete_staff',
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
                edithotelstaffdetail: function(usr) {
                        return $http({
                            method: 'post',
                            url: '/api/edithotelstaff_detail',
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
                leavingstatus: function(usr) {
                        return $http({
                            method: 'post',
                            url: '/api/leaving_status',
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
                uploadimagestaff: function(image) {
                            var fd = new FormData();
                            fd.append("file", image);
                            return $http({
                                method: 'post',
                                url: '/api/uploadstaffimage',
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