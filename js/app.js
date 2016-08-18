var app = angular.module('masterDetail', []);

	app.controller('masterDetailController', function($scope, EmployeeServices, $timeout) {

		$scope.isEditMode = false;

		// setting localStorage employees with an empty array for the very first time.

		/* JSH CODE REVIEW - all localStorage manipulations should be handled by the EmployeeServices.
		Think about how you can add this to the service.
		*/
		var isLocalStorageSet = localStorage.getItem("employees");

		/* JSH CODE REVIEW - don't need to do all of this testing b/c null, undefined, "" are all "falsy".  
		see: https://developer.mozilla.org/en-US/docs/Glossary/Falsy
		Therefore you can just do: 

		if(isLocalStorageSet){
	
		}

		*/
		if(isLocalStorageSet == null || isLocalStorageSet == undefined || isLocalStorageSet == "" ||isLocalStorageSet == "undefined" || isLocalStorageSet == "null"){			
			EmployeeServices.setEmployees([])	
		}

		/* JSH CODE REVIEW - This pattern of emitting events from your directives and listening in 
		your controller is a bad practice because it will become very confusing and chaotic when the app gets
		big.  It will also add a big overhead of listening for all these events.  It also creates a problem
		with seperation of concerns because your directives have to make sure they emit unique events or else
		they could conflict with some events of other directives or controllers.  Its better to have more 
		encapsulation.
		*/		
		
	  	$scope.$on('employeeSelected', function(){
	  	/* JSH CODE REVIEW - broadcasting an event to your employeeDetails directive is a bad pattern.
	  	I want you to get rid of this all together.  Angular does a lot of things through data binding. In this
	  	case, you your main app can have a selectedEmployee property that can be updated here when 
	  	a new employee is selected.  Your employeeDetails directive should receive an 'employee' property
	  	which will automatically update so you dont need to listen for events.  See the notes in 
	  	that directive.  Also, see the notes in the employeeList directive about removing the 
	  	events there as well. */		  		
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


    

       
    
