angular.module('masterDetail').directive("employeeDetails",function () {

    return {

      	templateUrl: "./js/directives/employeeDetails/employeeDetails.html",
        restrict: 'E',
        replace: true,        
        scope: {
          employee: "=",          
          deleteEmp: "&onDelete",
          edit: "&onEdit"
        }
    }
  })