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

          /* JSH CODE REVIEW - this is bad.  The whole purpose of binding data to the directive scope is so that
          you don't have to do this.  In your scope definition you have employee: "=".  Think about what this means
          and how you can use it to have yoru selected employee details automatically show up with this
          directive without having to use the EmployeeServices in this directive at all.  Your EmployeeServices
          should only be used in your main masterDetailController.  So refactor this directive and get rid
          of all events and all calls to EmployeeServices. */
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