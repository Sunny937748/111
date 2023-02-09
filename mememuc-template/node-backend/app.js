/**
 *  Use mongoose to connect the database
 *  References:
 *  https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
 *
 *  Login and Registration
 *  https://www.bezkoder.com/node-js-express-login-mongodb/
 *  https://www.youtube.com/watch?v=adMD46G5BXU
 *  https://www.youtube.com/watch?v=6oTDAyuQ5iw
 *
 *  cors: allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
 *  https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 *  npm website: https://www.npmjs.com/package/cors
 *
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
//const app = express();

mongoose.connect(`mongodb://0.0.0.0:27017/omm-2223`);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function () {
    console.log("MongoDB connected successfully");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var memesRouter = require("./routes/memes");

var app = express();

app.use(cors());
app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 }) 
);

app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/memes', memesRouter);

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
 );
  
app.use("/auth", authRoute);
  
  
app.listen(3002, () => {
    console.log("Server is running at port 3002");
});

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

app.get("/", (req, res) => {
    res.json({message: "Welcome to application."});
});

module.exports = app;
