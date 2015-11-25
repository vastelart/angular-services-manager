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
		addItem: function (service) {
			var form = document.querySelector('#addServiceForm');
			var ref = new Firebase('https://incandescent-fire-1819.firebaseio.com/');
			//var refs = ref.child('calls');
			
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
		}
	}
});