angular.module('masterDetail').directive("employeeDetails",function () {

    return {

      	templateUrl: "./js/directives/employeeDetails/employeeDetails.html",
        restrict: 'E',
        replace: true,
        /*COMMENT - I don't see you using tansclusion anywhere.  If you aren't using it then you should remove this. */
        transclude: true,
        scope: {
          employee: "=",
          /*COMMENT unfortunately, delete is a reserved javascript keyword so you shouldn't use it for a variable. Try a different name.*/
          delete: "&onDelete",
          edit: "&onEdit"
        },
        /*COMMENT - if you aren't using a controller then remove this */
        controller: function($scope, $element, $attrs){          
        },
         /*COMMENT - if you aren't using a linking function then remove this too. */
        link: function(scope, iElement, iAttrs){
        }
    }
  })