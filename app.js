var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
/**********************************/
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var redisClient = redis.createClient();

var userRouter = require('./routes/users');
var mainRouter = require('./routes/main');


var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
//var dev_db_url = 'mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true'
//var mongoDB = process.env.MONGODB_URI || dev_db_url;
let server = '127.0.0.1:27017';
let database = 'express-editor';
var mongoDB = `mongodb://${server}/${database}`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mysession',
  store: new redisStore({host: 'localhost', port: 6379, client: redisClient, ttl: 260}),
  saveUninitialized: false,
  resave: false,
  cookie: {sameSite: 'strict'}  //to remove cookie sameSite warning
}));

app.use('/', mainRouter);  //main page of the web site & login page
app.use('/folder', userRouter);  //user's main page (folder) & file page

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
