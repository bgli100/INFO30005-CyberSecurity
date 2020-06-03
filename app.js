const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// connect to database
require('./models/db');

//set up the basic routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const forumRouter = require('./routes/forum');

const app = express();

// set up the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//initialise the middle ware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use the middleware to go to each routes to do specific actions
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/forum', forumRouter);


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

app.listen(process.env.PORT || 8083);
