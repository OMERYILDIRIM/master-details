angular.module('masterDetail').directive("employeeForm",function (EmployeeServices) {

    return {

      	templateUrl: "./js/directives/employeeForm/employeeForm.html",
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          
        },

        controller: function($scope, $element, $attrs){
                    
          $scope.employee = {
            first_name: "",
            last_name: "",
            job_title: "",
            address: "",
            salary: "",
            year: ""
          }

          $scope.saveEmployee = function(){            
            $scope.$emit('saveAnEmployee', $scope.employee)
          }

          $scope.cancle = function(){
            $scope.$emit('cancleAddingNewEmployee');
          }

          $scope.$on('editAnEmployeeInEmployeeForm', function(event, data){                 
              $scope.employee = EmployeeServices.getEmployee();              
          })
        },

        link: function(scope, iElement, iAttrs){
            
        }
    }
  })