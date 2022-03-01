var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParse = require('body-parser');
var mongoose = require('mongoose');//new
mongoose.Promise = global.Promise;//new
mongoose.connect('mongodb://localhost/flutterapp_db1');//new

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var updateProfileRouter = require('./routes/updateProfile');
var getProfileRouter = require('./routes/getProfile');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// parse application/x-www-form-urlencoded
app.use(bodyParse.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParse.json())
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login',loginRouter);
app.use('/updateProfile', updateProfileRouter);
app.use('/getProfile', getProfileRouter);


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
