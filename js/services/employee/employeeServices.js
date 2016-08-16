angular.module('masterDetail').service('EmployeeServices', function(){

	this.selectedEmpolyee = {};
	this.editNewEmployee = false;

   	this.setEmployee = function(selectEmployee){
   		console.log(selectEmployee)
   		this.selectedEmpolyee = selectEmployee;
   	}

   	this.getEmployee = function(){
   		return this.selectedEmpolyee;
   	}

   	this.setEditType = function(flag){
   		this.editNewEmployee = flag;
   	}

   	this.getEditType = function(){
   		return this.editNewEmployee;
   	}
});
