angular.module('masterDetail').directive("employeeDetails",function () {

    return {

      	templateUrl: "./js/directives/employeeDetails/employeeDetails.html",
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          employee: "=",
          delete: "&onDelete",
          edit: "&onEdit"
        },

        controller: function($scope, $element, $attrs){          
        },

        link: function(scope, iElement, iAttrs){
        }
    }
  })