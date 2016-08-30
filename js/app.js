var app = angular.module('masterDetail', []);

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
        if($scope.employees.length){            
            if($scope.selectedEmployee){
                for(var iterator = 0; iterator < $scope.employees.length; iterator++ ){
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
            $scope.employees.push($scope.selectedEmployee);
            $scope.employees = EmployeeServices.refresh($scope.employees)
            $scope.selectedEmployee = $scope.employees[$scope.employees.length-1];
            $scope.isAddingNewEmployee = false;    
        }else{            
            for(var iterator = 0; iterator< $scope.employees.length; iterator++){
                if($scope.employees[iterator].first_name == $scope.selectedEmployee.first_name){
                    $scope.employees[iterator] = $scope.selectedEmployee;                    
                    $scope.employees = EmployeeServices.refresh($scope.employees)
                    break;                      
                }
            }
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


    

       
    
