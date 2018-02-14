
var adminApp = angular.module('fwrk.admin', [
	'ui.router',
	'btford.markdown',
	'angular-page-loader',	
	'fwrk.users',
	'fwrk.customers',
        'fwrk.rooms',
        'fwrk.services',
        'fwrk.pages',
        'angular-ticking-clock',
        'fwrk.resturants',
        'fwrk.hotel_staff',
        'fwrk.menus'
        

]);


adminApp.config(function($stateProvider,$urlRouterProvider){

	$urlRouterProvider.otherwise('/');
	
	$stateProvider
	.state('dashboard', {
		url: '/',
		templateUrl: '/admin/templates/admin_index.html',
		controller: 'dashboardCtrl'
	}) 
	.state('forgotpassword', {
		url: '/forgotpassword',
		templateUrl: '/admin/templates/forgotpassword.html',
		controller: 'forgotpasswordCtrl'
	})
        .state('resetpassword', {
                url: "/resetpassword",
                templateUrl: "/admin/templates/resetpassword.html",
                controller: 'forgotpasswordCtrl'
            })
        .state('booking', {
		url: '/booking',
		templateUrl: '/admin/templates/booking.html',
		controller: 'bookingCtrl'
	}) 
        .state('add_room', {
		url: '/add_room',
		templateUrl: '/admin/templates/add_room.html',
		controller: 'add_roomCtrl'
	}) 
        .state('add_service', {
		url: '/add_service',
		templateUrl: '/admin/templates/add_service.html',
		controller: 'add_serviceCtrl'
	}) 
        .state('my_profile', {
		url: '/my_profile',
		templateUrl: '/admin/templates/my_profile.html',
		controller: 'my_profileCtrl'
	}) 
         .state('checkout', {
		url: '/checkout',
		templateUrl: '/admin/templates/checkout.html',
		controller: 'checkoutCtrl'
	}) 
	.state('service_tickets', {
		url: '/service_tickets',
		templateUrl: '/admin/templates/service_tickets.html',
		controller: 'service_ticketsCtrl'
	}) 
	.state('resturant_orders', {
		url: '/resturant_orders',
		templateUrl: '/admin/templates/resturant_orders.html',
		controller: 'resturant_ordersCtrl'
	}) 
	.state('client_thacking', {
		url: '/client_thacking',
		templateUrl: '/admin/templates/client_thacking.html',
		controller: 'client_thackingCtrl'
	}) 
        .state('add_staff', {
		url: '/add_staff',
		templateUrl: '/admin/templates/add_staff.html',
		controller: 'add_staffCtrl'
	}) 
        .state('add_menu', {
		url: '/add_menu',
		templateUrl: '/admin/templates/add_menu.html',
		controller: 'add_menuCtrl'
	}) 
	

        
}).run(function($rootScope) {
    $rootScope.go = function() {
        window.location.href ='/admin/logout';
    }});

