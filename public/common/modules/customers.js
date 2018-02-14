
var customersModule = angular.module('fwrk.customers', []);

customersModule.service('Customers', function($http){

	return {
		all: function(){
			return $http.get('/api/allcustomers').then(function(customer){
				return customer.data;
			});
		},
                allgetdash: function(newPost){
			return $http({
				method: 'post',
				url: '/api/allgetdash',
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
		add: function(newPost){
			return $http({
				method: 'post',
				url: '/api/addcustomer',
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
                currentdate: function(newPost){
			return $http({
				method: 'post',
				url: '/api/todayroombooked',
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
                 findstayingadult: function(newPost){
			return $http({
				method: 'post',
				url: '/api/findstayingadult',
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
                findarradult: function(newPost){
			return $http({
				method: 'post',
				url: '/api/findarradult',
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
                checkoutcurrentdate: function(newPost){
			return $http({
				method: 'post',
				url: '/api/findcheckout',
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
                weakcurrentdate: function(newPost){
			return $http({
				method: 'post',
				url: '/api/weakroombooked',
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
                monthcurrentdate: function(newPost){
			return $http({
				method: 'post',
				url: '/api/monthroombooked',
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
                addclientthacking: function(newPost){
			return $http({
				method: 'post',
				url: '/api/addclient_thacking',
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
                deleteclientthacking: function(newPost){
			return $http({
				method: 'post',
				url: '/api/deleteclient_thacking',
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
                editclientthacking: function(newPost){
			return $http({
				method: 'post',
				url: '/api/editclient_thacking',
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
                addclientservice: function(newPost){
			return $http({
				method: 'post',
				url: '/api/addclient_service',
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
                deleteclientservice: function(newPost){
			return $http({
				method: 'post',
				url: '/api/deleteclient_service',
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
                editclientservice: function(newPost){
			return $http({
				method: 'post',
				url: '/api/editclient_service',
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
                 uploadimage: function(image) {
                            var fd = new FormData();
                            fd.append("file", image);
                            return $http({
                                method: 'post',
                                url: '/api/uploaduserimage',
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
                invoice: function(newPost){
			return $http({
				method: 'post',
				url: '/api/invoice_customer',
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
                updateroomstatus: function(newPost){
			return $http({
				method: 'post',
				url: '/api/update_room_status',
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
                savebilldata: function(newPost){
			return $http({
				method: 'post',
				url: '/api/save_bill_invoice',
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
                updateroomstatuspaybill: function(newPost){
			return $http({
				method: 'post',
				url: '/api/update_room_status_paybill',
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
                pendingroom: function(newPost){
			return $http({
				method: 'post',
				url: '/api/pendingrooms',
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
                changestatus: function(newPost){
			return $http({
				method: 'post',
				url: '/api/change_depaerture_status',
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
                allcustomer_detail: function(){
			return $http.get('/api/allcustomers_details').then(function(customer_detail){
				return customer_detail.data;
			});
		},
                
	};
});