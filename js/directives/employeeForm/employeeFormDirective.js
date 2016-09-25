angular.module('masterDetail').directive("employeeForm",function () {

    return {

      	templateUrl: "./js/directives/employeeForm/employeeForm.html",
        restrict: 'E',
        replace: true,        
        scope: {
            employee: "=",
            save: "&onSave",
            cancel: "&onCancel"
        }
    }
  })