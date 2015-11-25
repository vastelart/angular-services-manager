tables.controller('authCtrl', ['$scope', 'checkAuth', function ($scope, checkAuth) {
	$scope.loginFalse = true;
	$scope.checkUser = function (userObj) {
		checkAuth.user(userObj, $scope);
	};
}]);

tables.controller('customersCtrl', ['$scope', '$resource', '$state', '$stateParams', 'addService', function ($scope, $resource, $state, $stateParams, addService) {

	$scope.servLoader = true;
	//$scope.unit = 'MURGE';
	
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
		$scope.unit = idp;
		$state.go('edit', {id: $scope.unit});
		return $scope.unit;
	};

	$scope.removeServ = function (idp) {
		addService.removeItem(idp);
	};
}]);

tables.controller();