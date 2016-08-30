angular.module('masterDetail').directive("employeeList",function () {

    return {

      	templateUrl: "./js/directives/employeeList/employeeList.html",
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          employees: "=",
          employee: "=",
          addNew: "&onAddNew",
          select: "&onSelect"
        },

        controller: function($scope, $element, $attrs){             
        },

        link: function(scope, iElement, iAttrs){
        }
    }
  })