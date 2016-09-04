var app = angular.module('masterDetail', []);
/* COMMENT - App is not running for me.  I get EmployeeServices not defined in employeeServices file.  */
app.controller('masterDetailController', function($scope, EmployeeServices, $timeout) {

    $scope.isEditMode = false;
    $scope.isAddingNewEmployee = false;
    $scope.newEmployee = {
        first_name: "",
        last_name: "",
        job_title: "",
        address: "",
        salary: "",
        year: ""
    };
    $scope.selectedEmployee = {};
	$scope.selectedEmployIndex = 0;
    $scope.employees = EmployeeServices.getEmployees();
    $scope.selectedEmployee = $scope.employees[$scope.selectedEmployIndex];
    

    $scope.addEmployee = function(){
        $scope.selectedEmployee = angular.copy($scope.newEmployee);        
        $scope.isAddingNewEmployee = true;
        $scope.isEditMode = true;        
    }

    $scope.deleteEmployee = function(){  

        /*COMMENT - I think you can combine this if statement to ($scope.employees.length && $scope.selectedEmployee) */
        if($scope.employees.length){            
            if($scope.selectedEmployee){
                /*COMMENT - declare your variables at the top of the function to avoid surprises.*/
                for(var iterator = 0; iterator < $scope.employees.length; iterator++ ){
                    /*COMMENT best practice is to use the identity operator === */
                  if($scope.selectedEmployee.first_name == $scope.employees[iterator].first_name){
                    $scope.employees.splice(iterator,1);
                    $scope.employees = EmployeeServices.refresh($scope.employees) 
                    if(iterator == 0){
                      $scope.selectedEmployee = $scope.employees[iterator];
                    }else{
                      $scope.selectedEmployee = $scope.employees[iterator-1];                            
                    }                    
                    break;                                           
                  }
                }
            }
        } 
    }

    $scope.editEmployee = function(){
        $scope.isEditMode = true;        
    }

    $scope.saveEmployee = function(){
        if($scope.isAddingNewEmployee){  
            EmployeeServices.create($scope.selectedEmployee);          
            $scope.isAddingNewEmployee = false;    
        }else{ 
            EmployeeServices.update($scope.selectedEmployee);
            /*COMMENT - declare variables at top of function */           
            // for(var iterator = 0; iterator< $scope.employees.length; iterator++){
            //     if($scope.employees[iterator].first_name == $scope.selectedEmployee.first_name){
            //         $scope.employees[iterator] = $scope.selectedEmployee;                    
            //         $scope.employees = EmployeeServices.refresh($scope.employees)
            //         break;                      
            //     }
            // }
        }       
        $scope.isEditMode = false;
    }

    $scope.cancelAddingEditing = function(){
        if($scope.isAddingNewEmployee){
            $scope.isAddingNewEmployee = false;
            $scope.selectedEmployee = $scope.employees[$scope.selectedEmployIndex];
        }
        $scope.isEditMode = false;        
    }    

    $scope.selectEmployee = function(index){
        $scope.selectedEmployIndex = index;
        if($scope.isAddingNewEmployee){
            if(confirm("Discard adding New Employee")){            
                $scope.isAddingNewEmployee =false;
                $scope.isEditMode = false;
                $scope.selectedEmployee = $scope.employees[$scope.selectedEmployIndex];
            }
        }else{
            $scope.selectedEmployee = $scope.employees[$scope.selectedEmployIndex];
        }
    }
		
});


    

       
    
