function validateName(name) {
	var nameReg = /^[a-zA-Z]*$/;
	return nameReg.test( name ) && name.length > 0;
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validateALUEmail(email){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@student.alu.edu$/;
  return re.test(email);
}
function validatePassword(pass){
	var re=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
	return re.test(pass);
}

$(document).ready(
		function(){
			$("#submit").click(function(){
				var oldemail= $("#oldEmail").val();
				var fname = $("#fName").val();
				var lname= $("#lName").val();
				var email = $("#userEmail").val();
				var pass = $("#userPassword").val();


				if(!validateEmail(oldemail)){
					$("#oldemailspan").text("not a valid email!");
					$("#oldemailgroup").addClass("has-error");
					$("#oldemailgroup").removeClass("has-success");
				}else{
					$("#oldemailspan").text("");
					$("#oldemailgroup").addClass("has-success");
					$("#oldemailgroup").removeClass("has-error");
				}
				if(!validateName(fname)){
					$("#fnamespan").text("invalid first name");
					$("#fnamegroup").addClass("has-error");
					$("#fnamegroup").removeClass("has-success");
				}else {
					$("#fnamespan").text("");
					$("#fnamegroup").addClass("has-success");
					$("#fnamegroup").removeClass("has-error");
				}
				if(!validateName(lname )){
					$("#lnamespan").text("invalid last name");
					$("#lnamegroup").addClass("has-error");
					$("#lnamegroup").removeClass("has-success");
				}else{
					$("#lnamespan").text("");
					$("#lnamegroup").addClass("has-success");
					$("#lnamegroup").removeClass("has-error");
				}
				if(!validateALUEmail(email)){
					$("#useremailspan").text("not a valid email must end with @student.alu.edu!");
					$("#useremailgroup").addClass("has-error");
					$("#useremailgroup").removeClass("has-success");
				}else{
					$("#useremailspan").text("");
					$("#useremailgroup").addClass("has-success");
					$("#useremailgroup").removeClass("has-error");
				}
				if(!validatePassword(pass)){
					$("#passwordspan").text("Password must have 1 uppercase alphabet, 1 lowercase alphabet, 1 digits and 1 special character. Also the minimum allowed length is 8 characters.");
					$("#passwordgroup").addClass("has-error");
					$("#passwordgroup").removeClass("has-success");
				}else{
					$("#passwordspan").text("");
					$("#passwordgroup").addClass("has-success");
					$("#passwordgroup").removeClass("has-error");
				}

				if(!(validateEmail(oldemail) && validateName(fname) && validateName(lname) && validateALUEmail(email) && validatePassword(pass)))
					event.preventDefault();
			});
		});
