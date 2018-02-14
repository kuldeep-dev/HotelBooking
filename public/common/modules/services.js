
var servicesModule = angular.module('fwrk.services', []);

servicesModule.service('Services', function($http){

	return {
		all: function(){
			return $http.get('/api/allServices').then(function(room){
				return room.data;
			});
		},
		add: function(newPost){
			return $http({
				method: 'post',
				url: '/api/addservice',
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
                            url: '/api/deleteservice',
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
                            url: '/api/editservice',
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
                allservice: function(){
			return $http.get('/api/allServicesdetails').then(function(room){
				return room.data;
			});
		},

	};
});