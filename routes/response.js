var express = require('express');
var router = express.Router();
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var key = require('../emailMaker.json');
var fs = require('fs');
var mongojs = require('mongojs');


function makeNewEmail(fname,lname,newemail,emailpassword){
  var jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/admin.directory.user"],
    'eruiz@alu.edu'
  );

  jwtClient.authorize(function (err, tokens) {
        if (err) {
          console.log(err);
          return;
        }
        google.admin('directory_v1').users.insert({
        	  auth:jwtClient,
        	  resource: {
        		name: { givenName: fname, familyName: lname },
        		password:emailpassword,
        		primaryEmail:newemail
        	  }
        },function(error, response){
        	  if (error) {
              console.log('The API returned an error: ' + error);
              return;
            }

          var users = response.primaryEmail;
        	console.log(response);
            console.log(users);
      	}
      	);
    });
}


/* POST user new email info. */

router.post('/', function(req, res, next) {
  var oldEmail=req.body.oldEmail;
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var newEmail = req.body.userEmail;
  var emailPassword = req.body.userPassword;
  var db = mongojs('studentEmails', ['studentEmails']);
  //MongoDB
  db.studentEmails.findOne({email:oldEmail},function(error, docs){
    console.log("Error:")
    console.log(error);

    if(docs!=null){
      console.log("make new email");
      //  makeNewEmail(firstName,lastName,newEmail,emailPassword);
      console.log("delete email on database");
    /* uncomment to delete email from db after student email has been created
    try {
      db.orders.deleteOne( { email: oldEmail} );
      } catch (e) {
         print(e);
      }
    }*/
    console.log(docs);
    db.close();
		});

res.render('success', { title: 'Email Maker', message:'ALU Email Maker' });

//came from form
  console.log(req.body);
  //
});

module.exports = router;
