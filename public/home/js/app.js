
var app = angular.module('fwrk.home', [
	'ui.router',
        'fwrk.users'
]);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "/home/templates/main.html",
			controller: 'MainCtrl'
		})
                .state('forgetpassword', {
                url: "/forgetpassword",
                templateUrl: "/home/templates/forgetpassword.html",
                controller: 'ForgetCtrl'
                })
	$urlRouterProvider.otherwise("/");
});