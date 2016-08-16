angular.module('masterDetail').directive("employeeDetails",function (EmployeeServices) {

    return {

      	templateUrl: "./js/directives/employeeDetails/employeeDetails.html",
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          employee: "="
        },

        controller: function($scope, $element, $attrs){
          
          $scope.isEditing = false;

          $scope.editEmployee = function(){ 
              EmployeeServices.setEditType(false);                                                   
              $scope.$emit('editAnEmployee')                   
          }

          $scope.saveEmployee = function(){
              $scope.isEditing = false;              
          }

          $scope.deleteEmployee = function(){
              $scope.$emit('deleteAnEmployee');          
          }

          $scope.$on('showEmployeeDetails', function(){              
            $scope.employee = EmployeeServices.getEmployee();
          });

          $scope.$on('updateEmployeeDetailsWithNextEmployee', function(){              
            $scope.employee = EmployeeServices.getEmployee();
          });

          $scope.employee = EmployeeServices.getEmployee();
        },

        link: function(scope, iElement, iAttrs){

        }
    }
  })