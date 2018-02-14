
var roomsModule = angular.module('fwrk.rooms', []);

roomsModule.service('Rooms', function($http){

	return {
		all: function(){
			return $http.get('/api/allrooms').then(function(room){
				return room.data;
			});
		},
		add: function(newPost){
			return $http({
				method: 'post',
				url: '/api/addroom',
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
                            url: '/api/deleteroom',
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
                            url: '/api/editroom',
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
                allroomdata: function(usr) {
                        return $http({
                            method: 'post',
                            url: '/api/getroomdata',
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
               availableroom: function(usr) {
                        return $http({
                            method: 'post',
                            url: '/api/available_room',
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
                addroomtype: function(newPost){
			return $http({
				method: 'post',
				url: '/api/addroomtype',
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
                allroomtype: function(){
			return $http.get('/api/allroomstype').then(function(room){
				return room.data;
			});
		},
                removetype: function(usr) {
                        return $http({
                            method: 'post',
                            url: '/api/deleteroomtype',
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
                updateroomtype: function(usr) {
                        return $http({
                            method: 'post',
                            url: '/api/editroomtypedata',
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