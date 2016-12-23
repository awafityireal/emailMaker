var express = require('express');
var router = express.Router();
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var key = require('../emailMaker.json');
var fs = require('fs');
var mongojs = require('mongojs');

router.get('/response', function(req, res) {
  res.render('success', {title: 'Account Created'});
});


/* POST user new email info. */
router.post('/', function(req, res) {
  var oldEmail=req.body.oldEmail;
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var newEmail = req.body.userEmail;
  var emailPassword = req.body.userPassword;



  var db = mongojs('studentEmails', ['studentEmails']);
  //MongoDB
  db.studentEmails.findOne({email:oldEmail},function(error, docs){
    if(docs!=null){
          console.log("make new email");
          //message = makeNewEmail(firstName,lastName,newEmail,emailPassword);
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
                    name: { givenName: firstName, familyName: lastName },
                    password:emailPassword,
                    primaryEmail:newEmail
                    }
                },function(error, response){
                    if (error) {
                      console.log('The API returned an error: ' + error);
                      res.redirect('/googleError');
                      return;
                    }


                    console.log("going to delete email on database");
                    // uncomment to delete email from db after student email has been created
                    try {
                    db.studentEmails.remove( { email: oldEmail} );
                    console.log("deleted email on database");
                    } catch (e) {
                       console.log(e);
                    }

                    res.redirect('/response');
                    return;



                }
                );
            });

    }else{
      res.redirect('/error');
      return;
    }
    db.close();
		});
  //
});



module.exports = router;
