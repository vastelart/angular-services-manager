tables.factory('checkAuth', function checkAuthFactory ($http, $resource, $state) {
	return {
		user: function(obj, scope) {
			$http.get('./login.json').success(function (data) {
				if(obj.name === data.login && obj.pass === data.pass) {
					$state.go('customers');
				}
				else {
					scope.loginFalse = false;
				}
			}).error(function (error) {
				console.log(error);
			});
		}
	}
});

tables.factory('addService', function addServiceFactory ($firebaseObject, $firebaseArray) {
	return {
		addItem: function (service, scope, idpToCheck) {
			var form = document.querySelector('#addServiceForm');
			var ref = new Firebase('https://incandescent-fire-1819.firebaseio.com/');

			//Если введенный IDP уже есть в базе - останавливаемся
			for(var idp in idpToCheck) {
				if(service.idp === idpToCheck[idp]['IDP']) {
					scope.warningIDP = true;
					return false;
				}
			}

			//Если с IDP все ок, добавляем в базу
			ref.push().set({
				IDP: service.idp,
				bill: 0,
				email: 'mail@service.domain',
				login: service.login
			}, function (error) {
				if(error) {
			  		console.log(error);
				}
				else {
			  		console.log('OK');
			  		scope.warningIDP = false;
			  		scope.$apply();
				}
			});

			form.reset();
		},

		getServices: function (scope) {
			var services = new Firebase('https://incandescent-fire-1819.firebaseio.com/');
			
			$firebaseArray(services).$loaded()
				.then(function() {
					scope.servLoader = false;
				})
				.catch(function(error) {
					console.log(error);
				});

			return $firebaseArray(services);
		},

		removeItem: function (index) {
			var services = new Firebase('https://incandescent-fire-1819.firebaseio.com/' + index);
			var serviceItem = $firebaseObject(services);
			var deleteForm = document.querySelector('#removeServiceForm');

			serviceItem.$remove().then(function () {
				console.log('REMOVED ' + serviceItem);
			}, function (error) {
				console.log(error);
			});
		}
	}
});