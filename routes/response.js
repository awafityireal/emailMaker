var express = require('express');
var router = express.Router();
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var key = require('../emailMaker.json');
var fs = require('fs');
var mongo = require('mongodb');


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

          var users = response.user;
        	console.log(response + "\n" + users +"\n");
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

  //MongoDB
  var MongoClient = mongo.MongoClient;
  // Connection URL
  var url = 'mongodb://localhost:27017/studentEmails';

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    if(err){
      console.log("Couldn't connect to server");
    }else{
     console.log("Connected successfully to server");
    console.log( MongoClient.db("studentEmails").find({email:oldEmail}) );
   }
    db.close();
  });

//  makeNewEmail(firstName,lastName,newEmail,emailPassword);
//came from form
  console.log(req.body);

});

module.exports = router;
