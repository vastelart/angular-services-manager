var tables = angular.module('tables', ['ui.router', 'firebase', 'ngResource']);

tables.config(function($stateProvider, $urlRouterProvider) {
	
	/* Route by default and unmatched URLs */
	$urlRouterProvider.otherwise('/')
	
	$stateProvider
		.state('/', {
			url: '/',
			templateUrl: '/templates/login.html'
	})
		.state('customers', {
			url: '/customers',
			templateUrl: '/templates/customers.html'
	})
		.state('edit', {
			url: '/edit/:id',
			templateUrl: '/templates/edit.html',
			controller: 'customersCtrl'
		})
	
});