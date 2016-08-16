angular.module('masterDetail').directive("employeeList",function (EmployeeServices) {

    return {

      	templateUrl: "./js/directives/employeeList/employeeList.html",
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          employees: "="
        },

        controller: function($scope, $element, $attrs){
          console.log("employeeList directive executed");

          $scope.addEmployee = function(){
            EmployeeServices.setEditType(true);
            $scope.$emit('addAnEmployee')
          }

          $scope.selectEmployee = function(employee){
            EmployeeServices.setEmployee(employee);
            $scope.$emit('employeeSelected',function(event,data){
            })
          }

          $scope.$on('deleteEmployeeFromList', function(){
            if($scope.employees.length){
                var selectedEmployee = EmployeeServices.getEmployee();    
                if(selectedEmployee){
                    for(var iterator = 0; iterator < $scope.employees.length; iterator++ ){
                      if(selectedEmployee.first_name == $scope.employees[iterator].first_name){
                        $scope.employees.splice(iterator,1);
                        if(iterator == 0){
                          EmployeeServices.setEmployee($scope.employees[iterator]);
                        }else{
                          EmployeeServices.setEmployee($scope.employees[iterator-1]);                            
                        }
                        $scope.$emit('employeeDeletedFromList');
                        break;                                           
                      }
                    }
                }
            }            
          })

          $scope.selectEmployee($scope.employees[0]);          
        },

        link: function(scope, iElement, iAttrs){
              
            
        }
    }
  })