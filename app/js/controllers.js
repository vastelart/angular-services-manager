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
	$scope.warningIDP = false;

	$scope.addUnit = function (service) {
		addService.addItem(service, $scope, $scope.customers);
	};

	//===================

	$scope.editService = function(idp) {
		console.log(idp);
	};

	$scope.removeServ = function (idp) {
		addService.removeItem(idp);
	};
}]);

tables.controller();