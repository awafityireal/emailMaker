function validateName(name) {
	var nameReg = /^[a-zA-Z]*$/;
	return nameReg.test( name );
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

$(document).ready(
		function(){
			$("#submit").click(function(){
				var goodToGo = false;

				var ssn= $("#userSSN").val();
				var fname = $("#fName").val();
				var lname= $("#lName").val();
				var email = $("#userEmail").val();
				var pass = $("#userEmail").val();
					alert("SSN:"+ ssn +"\nFName:"+ fname +"\nLName:"+ lname+"\nEmail:"+ email + "\nform validate here");
				if(!validateName(fname)){
					alert("invalid name");
				}
				if(!validateName(lname )){
					alert("invalid name");
				}
				if(!validateEmail(email)){
					alert("not a valid email!")
				}
			});
		});
