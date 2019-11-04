var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

// starting of mongoose
mongoose.connect('localhost:27017/myWeb');
require('./config/passport');


const index = require('./routes/index');
const pdf = require('./routes/pdf');
const categories = require('./routes/categories');
const sell = require('./routes/sell');
const about = require('./routes/about');
const user = require('./routes/users');

var app = express();

// view engine setup
app.engine('hbs',hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret: 'My secret',saveUninitialized: false,resave: false}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());  
app.use(express.static(path.join(__dirname, 'public')));


// Login middleware
app.use(function(req,res,next){
  res.locals.signin = req.isAuthenticated();
  next();
})

// routes
app.use('/user',user);
app.use('/',index);
app.use('/',pdf);
app.use('/',categories);
app.use('/',sell);
app.use('/',about);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
