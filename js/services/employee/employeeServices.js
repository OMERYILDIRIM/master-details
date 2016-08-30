angular.module('masterDetail').service('EmployeeServices', function(){

   var employees = window.localStorage.getItem('employees');   
   if (employees === null || employees.length === 0)
   {  
      //setting an empty array if local storage is not set for the very first time
      EmployeeServices.setEmployees([]) 
   }

   this.setEmployees = function(employees){         
      localStorage.setItem('employees', JSON.stringify(employees));
   }

   this.getEmployees = function(){
      var employeesString = localStorage.getItem("employees")                    
      var employeesArray = JSON.parse(employeesString);         
      return employeesArray;
   }

   this.refresh = function(employeesArray){
      this.setEmployees(employeesArray);
      return this.getEmployees();
   }
});
