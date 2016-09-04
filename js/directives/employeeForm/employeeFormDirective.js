angular.module('masterDetail').directive("employeeForm",function () {

    return {

      	templateUrl: "./js/directives/employeeForm/employeeForm.html",
        restrict: 'E',
        replace: true,
        /*COMMNET - remove if not using. */
        transclude: true,
        scope: {
            employee: "=",
            save: "&onSave",
            cancel: "&onCancel"
        },
         /*COMMNET - remove if not using. */
        controller: function($scope, $element, $attrs){
        
        },
        /*COMMNET - remove if not using. */
        link: function(scope, iElement, iAttrs){
            
        }
    }
  })