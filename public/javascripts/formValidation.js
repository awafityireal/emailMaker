$(document).ready(
		function(){
			$("#submit").click(function(){
				var ssn= $("#userSSN").val();
				var fname = $("#fName").val();
				var lname= $("#lName").val();
				var email = $("#userEmail").val();
				var pass = $("#userEmail").val();
				alert("SSN:"+ ssn +"\nFName:"+ fname+ +"\nLName:"+ lname+"\nEmail:"+ email + "\nform validate here");
			});
		});