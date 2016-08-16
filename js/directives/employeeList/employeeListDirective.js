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
          
          $scope.addEmployee = function(){
            EmployeeServices.setEditType(true);
            $scope.$emit('addAnEmployee')
          }

          $scope.selectEmployee = function(employee){
            EmployeeServices.setEmployee(employee);
            $scope.$emit('employeeSelected',function(event,data){
            })
          }
          
          if($scope.employees.length){
              $scope.selectEmployee($scope.employees[0]);            
          }
          
        },

        link: function(scope, iElement, iAttrs){
              
            
        }
    }
  })