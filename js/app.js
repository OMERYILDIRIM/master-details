var app = angular.module('masterDetail', []);

	app.controller('masterDetailController', function($scope, EmployeeServices, $timeout) {	  
	  	
	  	$scope.isEditMode = false;

	  	$scope.$on('employeeSelected', function(){	  		
	  		$scope.$broadcast("showEmployeeDetails", function(){})
	  	})

	  	$scope.$on('addAnEmployee', function(event, data){
	  		$scope.isEditMode = true;	  		
	  	})

	  	$scope.$on('saveAnEmployee', function(event,data){ 
	  		if(EmployeeServices.getEditType()){
	  			$scope.employees.push(data);
	            $scope.isEditMode = false;
	            EmployeeServices.setEmployee($scope.employees[$scope.employees.length-1]);
	            EmployeeServices.setEditType(false)
	  		}else{

		  		for(var iterator = 0; iterator< $scope.employees.length; iterator++){
		  			if($scope.employees[iterator].first_name == data.first_name){
		  				$scope.employees[iterator] = data;
		  				$scope.isEditMode = false;
		  				break;		  				
		  			}
		  		}
	  		}	
        })

        $scope.$on('cancleAddingNewEmployee', function(data){                                    
              $scope.isEditMode = false;
        })

        $scope.$on('deleteAnEmployee', function(){	  			  			  		
	  		$scope.$broadcast("deleteEmployeeFromList", function(data){})
	  	})

	  	$scope.$on('employeeDeletedFromList', function(data){	  			  			  		
	  		$scope.$broadcast("updateEmployeeDetailsWithNextEmployee", function(){})
	  	})

	  	$scope.$on('editAnEmployee', function(data){	
	  		console.log("editEmployeeInEmployeeForm in App controller")
	  		$scope.isEditMode = true;
	  		$timeout(function() {
              $scope.$broadcast("editAnEmployeeInEmployeeForm", function(){})
          }, 10);
	  	})

	    $scope.employees = [
	  		{
			  "first_name": "Kelly",
			  "last_name": "Henry",
			  "job_title": "Environmental Specialist",
			  "address": "16 Bartillon Plaza",
			  "salary": "$5.82",
			  "year": 10
			}, {
			  "first_name": "Melissa",
			  "last_name": "Cunningham",
			  "job_title": "Community Outreach Specialist",
			  "address": "370 Merry Parkway",
			  "salary": "$4.00",
			  "year": 38
			}, {
			  "first_name": "Roy",
			  "last_name": "Clark",
			  "job_title": "Help Desk Operator",
			  "address": "34 Hollow Ridge Plaza",
			  "salary": "$4.41",
			  "year": 54
			}]
	});


    

       
    
