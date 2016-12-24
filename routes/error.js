var express = require('express');
var router = express.Router();

router.get('/error', function(req, res, next) {
  if(req.session.notfound){
  res.render('error', { title:'Unsuccessful', message:req.session.notfound});
}else{
  res.render('error', { title:'Unsuccessful', message:""});
}
});

router.get('/googleError', function(req, res, next) {
  if(req.session.email && req.session.googleErrorMessage){
  res.render('error', { title:'Unsuccessful', message: req.session.email + " " + req.session.googleErrorMessage});
}else{
  res.render('error', { title:'Unsuccessful', message: ""});
}
});
module.exports = router;
