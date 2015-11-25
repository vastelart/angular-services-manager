tables.controller('authCtrl', ['$scope', 'checkAuth', function ($scope, checkAuth) {
	$scope.loginFalse = true;
	$scope.checkUser = function (userObj) {
		checkAuth.user(userObj, $scope);
	};
}]);


tables.controller('customersCtrl', ['$scope', 'addService', function ($scope, addService) {

	$scope.servLoader = true;
	
	//===================

	$scope.customers = addService.getServices($scope);

	//===================

	$scope.addUnit = function (service) {
		addService.addItem(service);
	};

	//===================

	$scope.editService = function(idp) {
		console.log(idp);
	};	
}]);

tables.controller();