var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pms', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true })
  .then(() => {
    console.log("Database Connected")
  }).catch((err) => {
    console.log("DataBase Failed To Connect");
  })

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');
var addcatRouter = require('./routes/add-new-category');
var passwordCategory = require('./routes/passwordCategory');
var addpassRouter = require('./routes/add-new-password');
var viewCategory = require('./routes/view-all-password');
var addCategoryApi = require('./api/add_category');
var addProductApi = require('./api/product');
var userApi = require('./api/user');



var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/add-new-category', addcatRouter);
app.use('/passwordCategory', passwordCategory);
app.use('/add-new-password', addpassRouter);
app.use('/view-all-password', viewCategory);
app.use('/api', addCategoryApi);
app.use('/productApi', addProductApi);
app.use('/userApi', userApi);

 



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
