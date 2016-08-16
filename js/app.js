var app = angular.module('masterDetail', []);

	app.controller('masterDetailController', function($scope, EmployeeServices, $timeout) {

		$scope.isEditMode = false;

		// setting localStorage employees with an empty array for the very first time.
		var isLocalStorageSet = localStorage.getItem("employees");
		if(isLocalStorageSet == null || isLocalStorageSet == undefined || isLocalStorageSet == "" ||isLocalStorageSet == "undefined" || isLocalStorageSet == "null"){			
			EmployeeServices.setEmployees([])	
		}			
		
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
	            $scope.employees = EmployeeServices.refresh($scope.employees)
	  		}else{

		  		for(var iterator = 0; iterator< $scope.employees.length; iterator++){
		  			if($scope.employees[iterator].first_name == data.first_name){
		  				$scope.employees[iterator] = data;
		  				$scope.isEditMode = false;
		  				$scope.employees = EmployeeServices.refresh($scope.employees)
		  				break;		  				
		  			}
		  		}
	  		}	
        })

        $scope.$on('cancleAddingNewEmployee', function(data){                                    
              $scope.isEditMode = false;
        })

        $scope.$on('deleteAnEmployee', function(){	  			  			  			  		
	  		if($scope.employees.length){
	  		var selectedEmployee = EmployeeServices.getEmployee(); 	          	       
                if(selectedEmployee){
                    for(var iterator = 0; iterator < $scope.employees.length; iterator++ ){
                      if(selectedEmployee.first_name == $scope.employees[iterator].first_name){
                        $scope.employees.splice(iterator,1);
                        $scope.employees = EmployeeServices.refresh($scope.employees) 
                        if(iterator == 0){
                          EmployeeServices.setEmployee($scope.employees[iterator]);
                        }else{
                          EmployeeServices.setEmployee($scope.employees[iterator-1]);                            
                        }
                        $scope.$broadcast("updateEmployeeDetailsWithNextEmployee", function(){})                
                        break;                                           
                      }
                    }
                }
            } 
	  	})

	  	$scope.$on('editAnEmployee', function(data){	
	  		console.log("editEmployeeInEmployeeForm in App controller")
	  		$scope.isEditMode = true;
	  		$timeout(function() {
              $scope.$broadcast("editAnEmployeeInEmployeeForm", function(){})
          }, 10);
	  	})

        $scope.employees = EmployeeServices.getEmployees()
		
	});


    

       
    
