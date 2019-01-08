//Core
var express = require('express');
var logger = require('morgan');

//Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var inventoryRouter = require('./routes/inventory');
var externalRouter = require('./routes/external');

//Utils
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var path = require('path');

//Config
var configDB = require('./config/database.js');
require('./config/passport')(passport); // pass passport for configuration

// configuration ===============================================================

var app = express();


mongoose.connect(configDB.url); // connect to our database
app.locals.db = mongoose.connection;
app.locals.db.on('error', console.error.bind(console, 'connection error:'));
app.locals.db.once('open', function() {
    // we're connected!
});



// required for passport
app.use(session({ secret: 'samuraijockeymonster', cookie: { httpOnly: false } })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/inventory', inventoryRouter);
app.use('/external', externalRouter);

module.exports = app;
