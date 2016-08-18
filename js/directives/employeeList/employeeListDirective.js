angular.module('masterDetail').directive("employeeList",function (EmployeeServices) {

    return {

      	templateUrl: "./js/directives/employeeList/employeeList.html",
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          employees: "="
        },

        controller: function($scope, $element, $attrs){
          
          $scope.addEmployee = function(){
            /* JSH CODE REVIEW  - it is best, if possible to keep your services separated from your
            directives ( not always possible though ).  The idea is that your directive should not 
            have to know anything about the EmployeeSerivces to work.  Your direct should jsut get
            data from somewhere and do its thing.  This way any other controller or app could potentially use
            your directive and it is more modular. Think of the directive as being a something that works a
            certain way and may have certain actions.  The job of this directive is to show a list of employees 
            and allow the user to select one of them.  When a user selects one of them an action has taken place.
            It doesn't care what any controller using it does in response to this action.  Right now you are 
            calling the EmployeeServices and broadcasting an event.  I want you to get rid of this completely and 
            instead use the "&" binding in your scope definition to call a provided method that is provided by the 
            'masterDetailController'.  Look at https://docs.angularjs.org/guide/directive and search for &onClose
            to see an example of what they are doing and come up with a plan how you can use something like this in your
            directive so that your only your 'masterDetailController' knows when a new employee has
            been selected.
             */
            EmployeeServices.setEditType(true);
            $scope.$emit('addAnEmployee')
          }

          $scope.selectEmployee = function(employee){
            EmployeeServices.setEmployee(employee);
            $scope.$emit('employeeSelected',function(event,data){
            })
          }
          
          if($scope.employees.length){
              $scope.selectEmployee($scope.employees[0]);            
          }
          
        },

        link: function(scope, iElement, iAttrs){
              
            
        }
    }
  })