var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');

var csrfProtection = csrf();
router.use(csrfProtection);

// router.get('/profile',isLoggedIn,(req,res,next)=>{
//   res.render('user/profile')
// })

router.get('/logout',isLoggedIn,(req,res,next)=>{
  req.logout();
  res.redirect('/');
})

router.use('/',notLoggedIn,(req,res,next)=>{
  next();
})

router.get('/signup', function(req, res, next) { 
  var messages = req.flash('error');
  res.render('user/signup',{csrfToken: req.csrfToken(),messages:messages});
});

router.post('/signup',passport.authenticate('local.signup',{
  successRedirect:'/user/signin',
  failureRedirect:'/user/signup',
  failureFlash: true
}))

router.get('/signin',(req,res,next)=>{
  var messages = req.flash('error');
  res.render('user/signin',{csrfToken: req.csrfToken(),messages:messages});
})

router.post('/signin',passport.authenticate('local.signin',{
  successRedirect:'/sell',
  failureRedirect:'/user/signin',
  failureFlash: true
}))
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req,res,next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}


module.exports = isLoggedIn;
module.exports = router;
