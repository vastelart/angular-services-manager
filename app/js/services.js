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

tables.factory('addService', function addServiceFactory ($firebaseObject, $firebaseArray, $state) {
	
	var deleteForm = document.querySelector('#removeServiceForm');
	
	var removeSubmit = document.querySelector('#removeSubmit');
	var editSubmit = document.querySelector('#editSubmit');


	return {
		addItem: function (service, scope, idpToCheck) {
			var form = document.querySelector('#addServiceForm');
			//var addSubmit = document.querySelector('#addSubmit');
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
			scope.service = '';
		},

		getServices: function (scope, uid) {
			var services = new Firebase('https://incandescent-fire-1819.firebaseio.com/' + uid);
			
			$firebaseArray(services).$loaded()
				.then(function() {
					scope.servLoader = false;
				})
				.catch(function(error) {
					console.log(error);
				});

			if(uid !== '') {
				return $firebaseObject(services);
			}
			else {
				return $firebaseArray(services);
			}
		},

		removeItem: function (scope, index) {
			var services = new Firebase('https://incandescent-fire-1819.firebaseio.com/' + index);
			var serviceItem = $firebaseObject(services);

			serviceItem.$remove().then(function () {
				console.log('REMOVED ' + serviceItem);
			}, function (error) {
				console.log(error);
			});

			deleteForm.reset();
			scope.serv = '';
		},

		edit: function (id, idp, unit) {
			var services = new Firebase('https://incandescent-fire-1819.firebaseio.com/' + id);
			var ref = $firebaseObject(services);

			ref.login = unit.login;
			ref.email = unit.email;
			ref.bill = unit.bill;
			ref.IDP = idp;

			ref.$save().then(function(ref) {
			  console.log('OK');
			  $state.go('customers');
			}, function(error) {
			  console.log("Error:", error);
			});
		}
	}
});