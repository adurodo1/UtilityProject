var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session= require('express-session')
const localStrategy = require('passport-local').Strategy;

const validateUser=require('./routes/helpermethods/validatelogin')
const env=require('dotenv');
env.config();

var app = express();

// view engine setup
 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
 
//
// set up session, configuration for server session is given here, the secret is used to generate an hash
app.use(
  session(
    {
      secret:process.env.SECRET,
      resave:false,
      saveUninitialized:true
    }
  )
);

// Set up passport
// set up configuration

app.use(passport.initialize());
app.use(passport.session())

//configure passport local strategy

passport.use('local',new localStrategy({
  usernameField:'username',
  passwordField:'userpassword',
  passReqToCallback: true //passback entire req to call back
},async (req,username,userpassword,done)=>
{

 
  if(!username || !userpassword ) {
     return done(null, false, 'message','All fields are required.'); 
    }
    var data= await validateUser(username,userpassword);
    //console.log(data)

    return done(null, data.data[0]);


}))

const dbConnect=require('./dbConnect');
//Passport serializes user information to store in session, deserialize function is used to deserialize the data.
//stores the id object/data into the session wc has been secreted
passport.serializeUser(function(user, done){
 
  done(null, user.id);
});
//extracts the secreted data to be used for further processing
passport.deserializeUser(function(id, done){
  console.log(id);
  console.log("sdfsdfsd")
  dbConnect.from('users')
  .select('*').eq('id',id).then((d)=>{
 console.log(d)
    done(null, d.data[0]);
  }).catch(e=>console.error)

});

//set routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter=require('./routes/login')
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

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
