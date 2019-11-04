const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
const bookData = require('../models/book');

function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
      return next();
    }
    req.flash('error','Please Signin to continue.')
    res.redirect('/user/signin');
  }
// starting of routes
router.get('/sell',isLoggedIn,(req,res,next)=>{
    res.render('sell',{ title: 'Form Fill', success: req.session.success, errors: req.session.errors});
    req.session.success = null;
    req.session.errors = null;
})

router.post('/sell',isLoggedIn,(req,res,next)=>{
    req.check('name')
     .isLength({min:3}).withMessage('Name must be of 3 characters long.')
     .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.');
    req.check('email','Email is invalid.').isEmail();
    req.check('phone')
     .isLength({min:10,max:10}).withMessage('Phone number must be of 10 digits.');
    req.check('book_name')
     .isLength({min:3}).withMessage('Book name must be of 3 characters long.')
     .matches(/^[A-Za-z\s]+$/).withMessage('Book Name must be alphabetic.');
    req.check('book_price')
     .isNumeric().withMessage('Price must be numeric.');
    var errors = req.validationErrors();
    if (errors){
        req.session.errors = errors;
        req.session.success = false;
    } else {
        req.session.success = true;
        var item = {
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            book_name:req.body.book_name,
            book_price:req.body.book_price

        };
        var data = new bookData(item);
        data.save();
    }
    res.redirect('/sell');
})

module.exports = router;
module.exports.bookData = bookData