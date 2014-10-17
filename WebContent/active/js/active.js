'use strict';

function ActiveController($gloriaAPI, $scope, $timeout, $location,
		$gloriaLocale, $filter, $http) {

	var useract="";
	var userpassw="";
		
	$scope.ready = false;
	$scope.active = [];

	$gloriaAPI.getUserInformation(function(data){
		useract = data.name; 
		userpassw = encodeURIComponent(data.password);
		
		var filterAct =  "{\"user\": \"" + useract + "\", \"states\":[\"SUBMITTED\", \"CONFIRMED\", \"DELAYED\"]}";	
		$http({
		    url: 'http://gloriapre.isa.uma.es:8080/GLSch/Sch/Scheduler/getOPByFilter/' + userpassw + '/1/100/',
		    method: 'POST',
		    headers: { 'Content-Type': 'application/json'},
		    data: filterAct
		}).success(function(data, status, statusText, headers, config) {
			$scope.activePlans = data.items;
		}).error(function(data, status, statusText, headers, config) {
	        alert('ERROR: ' + status );
	      });
	  
	});
	
	$gloriaLocale.loadResource('active/lang', 'active', function() {
		$scope.ready = true;
	});

	$scope.$on('$destroy', function() {
		// $timeout.cancel($scope.timer);
	});
}
 