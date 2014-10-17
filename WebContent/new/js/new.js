'use strict';
function TelsCtrl($scope) {
    $scope.tels = [{name: 'BOOTES1A', id: '22'},
                   {name: 'BART', id: '7'},
                   {name: 'CATA500', id: '11'},
                   {name: 'MMT', id: '16'},
                   {name: 'TAU', id: '15'},
                   {name: 'PIOFTHESKY1', id: '9'},
                   {name: 'PIOFTHESKY2', id: '17'},
                   {name: 'REM', id: '24'}
                   ]; 
}


function FilterCtrl($scope) {
    $scope.filters = [{name: 'OPEN'},
                      //{name: 'CLOSED'},
                      //{name: 'BESSEL_I'},
                      {name: 'BESSEL_R'},
                      {name: 'BESSEL_V'},
                      {name: 'BESSEL_B'},
                      //{name: 'BESSEL_U'},
                      {name: 'SLOAN_U'},
                      {name: 'SLOAN_G'},
                      {name: 'SLOAN_R'},
                      {name: 'SLOAN_I'},
                      {name: 'SLOAN_Z'},
                      //{name: 'Z_FILTER'},
                      //{name: 'Y_FILTER'},
                      //{name: 'CCD_RESPONSE'},
                      //{name: 'GRISM'},
                      //{name: 'SLIT_25UM'},
                      //{name: 'SLIT_50UM'},
                      //{name: 'SLIT_75UM'},
                      //{name: 'SLIT_100UM'},
                      {name: 'UKIRT_H'},
                      {name: 'UKIRT_J'},
                      {name: 'UKIRT_K'},
                      //{name: 'UKIRT_Z'},
                      //{name: 'UKIRT_Y'},
                      {name: 'JOHNSON_B'},
                      {name: 'JOHNSON_R'},
                      //{name: 'JOHNSON_I'},
                      //{name: 'JOHNSON_J'},
                      //{name: 'JOHNSON_K'},
                      //{name: 'JOHNSON_L'},
                      //{name: 'H_ALPHA'},
                      {name: 'CLEAR'},
                      //{name: 'JOHNSON_G'},
                      {name: 'JOHNSON_V'},
                      {name: 'INFRARED_RG850'},
                      //{name: 'DARK'},
                      {name: 'GENERIC_B'},
                      {name: 'GENERIC_G'},
                      //{name: 'GENERIC_H'},
                      {name: 'GENERIC_I'},
                      //{name: 'GENERIC_J'},
                      //{name: 'GENERIC_K'},
                      //{name: 'GENERIC_L'},
                      {name: 'GENERIC_R'},
                      {name: 'GENERIC_V'},
                      //{name: 'GENERIC_Y'},
                      {name: 'GENERIC_Z'}];
}


function NewObservationController($gloriaAPI, $scope, $timeout, $location,
		$gloriaLocale, $filter, $http) {


	var myUser = "";
	var myPass = "";
	$scope.expTimInf = "expTime";
		
	$gloriaAPI.getUserInformation(function(data){
		 myUser = data.name;
		 myPass = encodeURIComponent(data.password);
		});
	
	$scope.ready = false;

	$scope.setObj = function(val){
		$scope.obj = val;
		if (val == 'oname'){
			$scope.ra ="";
			$scope.dec="";
		}
		else{
			$scope.objname=""; 
		}
	};
	
	$scope.setTarAltInf = function(val){
		$scope.tarAltInf = val;
	};
	
	
	$scope.setExpTimInf = function(val){
		$scope.expTimInf = val;
		
	};
	
	
	$scope.objectClicked = function(obj) {
		$scope.objname = obj;
		$scope.objectSelected = obj;
		$scope.requestSuccess = false;
		$scope.requestLimit = false;
		$scope.requestError = false;
		
	};


	
	$scope.sendObs = function(){
	
		$scope.wait = true;
		
		var myPlan = angular.fromJson(document.getElementById('plan').value);
		
		myPlan.metadata.user = myUser;		
		if (myPlan.constraints.moonDistance == "") delete myPlan.constraints.moonDistance; 
		if (myPlan.constraints.moonAltitude == "") delete myPlan.constraints.moonAltitude;
		if (myPlan.constraints.notBeforeDate == "") delete myPlan.constraints.notBeforeDate;  
		if (myPlan.constraints.notAfterDate == "") delete myPlan.constraints.notAfterDate;
		if (myPlan.constraints.daysFromNewMoon == "") delete myPlan.constraints.daysFromNewMoon;
		//if (myPlan.constraints.pixelScale == "") delete myPlan.constraints.pixelScale;
		
		if (myPlan.constraints.seeing == "") delete myPlan.constraints.seeing;
		if (myPlan.constraints.foV == "") delete myPlan.constraints.foV;
		if (myPlan.constraints.exposureTime == "") delete myPlan.constraints.exposureTime;
		if (myPlan.constraints.preferredTelescope == "") delete myPlan.constraints.preferredTelescope;
		if (myPlan.constraints.targetAltitudeInfo == "") delete myPlan.constraints.targetAltitudeInfo;
		  
		
		
		if (myPlan.metadata.description == "") delete myPlan.metadata.description;
		
		$http({
		    url: 'http://gloriapre.isa.uma.es:8080/GLSch/Sch/Scheduler/planSubmit/' + myPass,
			method: 'POST',
		    headers: { 'Content-Type': 'application/json'},
		    data: angular.toJson(myPlan)
		}).success(function(data, status, statusText, headers, config) {
			$scope.requestSuccess = true;
			$scope.requestLimit = false;
			$scope.requestError = false;
			$scope.wait = false;
		  }).
	      error(function(data, status, statusText, headers, config) {
	        $scope.requestSuccess = false;
			$scope.requestError = true;
			$scope.wait = false;
			alert('ERROR: ' + status );
		  });
	      
		
			
	};
		

	$scope.objects = [ {
		id : 'M1',
		style : {
			backgroundImage : 'url(new/img/M1.png)'
		}
	}, {
		id : 'M8',
		style : {
			backgroundImage : 'url(new/img/M8.png)'
		}
	}, {
		id : 'NGC891',
		style : {
			backgroundImage : 'url(new/img/NGC891.png)'
		}
	}, {
		id : 'M45',
		style : {
			backgroundImage : 'url(new/img/M45.png)'
		}
	}, {
		id : 'NGC1499',
		style : {
			backgroundImage : 'url(new/img/NGC1499.png)'
		}
	}, {
		id : 'jupiter',
		style : {
			backgroundImage : 'url(new/img/JUPITER.png)'
		}
	}, {
		id : 'M31',
		style : {
			backgroundImage : 'url(new/img/M31.png)'
		}
	}, {
		id : 'NGC278',
		style : {
			backgroundImage : 'url(new/img/NGC278.png)'
		}
	} ];

	$gloriaLocale.loadResource('new/lang', 'new', function() {
		$scope.ready = true;
	});

	$scope.$on('$destroy', function() {
		// $timeout.cancel($scope.timer);
	});
}
