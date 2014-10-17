'use strict';

function CompletedController($gloriaAPI, $scope, $timeout, $location,
		$gloriaLocale, $filter, $http) {

	var usercomp="";
	var userpassw="";
		
	$scope.ready = false;
	$scope.active = [];

	$scope.objectClicked = function(obj) {
		$scope.objectSelected = obj;
		$scope.requestSuccess = false;
		$scope.requestLimit = false;
	};

	$gloriaAPI.getUserInformation(function(data){
		usercomp = data.name; 
		userpassw = encodeURIComponent(data.password);
			
		var filterAct =  "{ \"user\": \"" + usercomp + "\", \"states\":[\"REJECTED\", \"DONE_COMPLETE\", \"ERROR\", \"ABORTED\", \"DONE_PARTIAL\"]}";	
		
		$http({
		    url: 'http://gloriapre.isa.uma.es:8080/GLSch/Sch/Scheduler/getOPByFilter/' + userpassw +'/1/500/', 
		    method: 'POST',
		    headers: { 'Content-Type': 'application/json'},
		    data: filterAct
		}).success(function(data, status, statusText, headers, config) {
			$scope.completedPlans = data.items;
		}).error(function(data, status, statusText, headers, config) {
	        alert('ERROR: ' + status );
	      });
	  
	});
	
	$scope.getImages = function(uid){
		$http({
		    url: 'http://gloriapre.isa.uma.es:8080/GLSch/Sch/Scheduler/getImgURL/' + usercomp + '/' +  userpassw + '/' + uid,
		    method: 'GET',
		    headers: { 'Content-Type': 'application/json'},
		}).success(function(data, status, statusText, headers, config) {
			$scope.imgList = data.imgURL;
			$scope.uuid = uid;
		}).error(function(data, status, statusText, headers, config) {
	        alert('ERROR: ' + status );
	      }); 
	};
	
	$scope.rateObservation = function(uid,score){
		$http({
			url: 'http://gloriapre.isa.uma.es:8080/GLSch/Sch/Scheduler/setScore/' + usercomp + '/' +  userpassw + '/' + uid + '/' + score,
		    method: 'POST',
		    headers: { 'Content-Type': 'application/json'},
		}).success(function(data, status, statusText, headers, config) {
			alertMsg();
		}).error(function(data, status, statusText, headers, config) {
	        alert('ERROR: ' + status + statusText );
	      });
	};
	
	$gloriaLocale.loadResource('completed/lang', 'completed', function() {
		$scope.ready = true;
	});

	$scope.$on('$destroy', function() {
		// $timeout.cancel($scope.timer);
	});
	
		
}