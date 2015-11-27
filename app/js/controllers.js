tables.controller('authCtrl', ['$scope', 'checkAuth', function ($scope, checkAuth) {
	$scope.loginFalse = true;
	$scope.checkUser = function (userObj) {
		checkAuth.user(userObj, $scope);
	};
}]);

tables.controller('customersCtrl', ['$scope', '$resource', '$state', '$stateParams', 'addService', '$rootScope', function ($scope, $resource, $state, $stateParams, addService, $rootScope) {

	$scope.servLoader = true;
	$scope.unitToEdit;

	//===================

	$scope.customers = addService.getServices($scope, '');

	//===================
	
	$scope.warningIDP = false;

	$scope.addUnit = function (service) {
		addService.addItem(service, $scope, $scope.customers);
	};

	//===================

	$scope.editService = function(uid) {
		$state.go('edit', {id: uid})
		.then(function () {
			$rootScope.unitToEdit = addService.getServices($scope, uid);
		});
	};

	//===================

	$scope.removeServ = function (idp) {
		addService.removeItem($scope, idp);
	};

	//===================

	$scope.editUnit = function (id, idp, unit) {
		addService.edit(id, idp, unit);
	};
}]);