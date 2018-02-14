
var resturantsModule = angular.module('fwrk.resturants', []);

resturantsModule.service('Resturant', function($http){

	return {
		all: function(){
			return $http.get('/api/allresturant').then(function(resturant){
				return resturant.data;
			});
		},
		add: function(newPost){
			return $http({
				method: 'post',
				url: '/api/addresturant',
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
                            url: '/api/deleteorder',
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
                            url: '/api/editorder',
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
               
               
                
	};
});