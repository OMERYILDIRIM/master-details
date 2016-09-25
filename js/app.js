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
        if(confirm("Do you want to delete this employee")){            
            $scope.selectedEmployee = EmployeeServices.delete($scope.selectedEmployee);          
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


    

       
    
