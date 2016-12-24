var express = require('express');
var router = express.Router();

router.get('/error', function(req, res, next) {
  if(req.session.notfound){
  res.render('error', { title:'Unsuccessful', message:req.session.notfound, message2:"Email us to fix that at <a href=\"mailto:tech@alu.edu?subject=Insert%20my%20email%20into%20mongo!\">tech@alu.edu</a>"});
}else{
  res.render('error', { title:'Unsuccessful', message:"", message2:""});
}
});

router.get('/googleError', function(req, res, next) {
  if(req.session.email && req.session.googleErrorMessage){
  res.render('error', { title:'Unsuccessful', message: req.session.email + " " + req.session.googleErrorMessage, message2:""});
}else{
  res.render('error', { title:'Unsuccessful', message: "", message2:""});
}
});
module.exports = router;
