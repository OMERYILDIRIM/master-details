angular.module('masterDetail').directive("employeeForm",function () {

    return {

      	templateUrl: "./js/directives/employeeForm/employeeForm.html",
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            employee: "=",
            save: "&onSave",
            cancel: "&onCancel"
        },

        controller: function($scope, $element, $attrs){
        
        },

        link: function(scope, iElement, iAttrs){
            
        }
    }
  })