var express = require('express');
var router = express.Router();

router.get('/cpage',function(req, res, next) {
  if(req.session.first &&   req.session.last &&   req.session.email){
  res.render('confirmation', {title: 'Account Created', firstName:req.session.first, lastName:req.session.last, email:req.session.email});
  }else {
    console.log("idk");
    res.render('sessionunknownview',{});
  }
});
module.exports = router;
