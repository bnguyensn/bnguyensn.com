// Set up process.env
const dotenv = require('dotenv').config();

// Express server
const express = require('express');

// Utilities
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');  // Needed to access POST requests' data

// Security
const helmet = require('helmet');  // Production security package

// Features
const blog_db = require('./server/blog/connect');

/**
 * ROUTER MODULES =========
 * Each route corresponds to a host in our domain
 * */

const index = require('./server/routes/index');
const login = require('./server/routes/login');
const chat = require('./server/routes/chat');

/**
 * EXPRESS APPLICATION ==========
 * */

// Create the Express server
const app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /src
//app.use(favicon(path.join(__dirname, 'src', 'favicon.ico')));

// Set up port
app.set('port', process.env.PORT || 63343);

// Set up features
blog_db.connect();

/** ********** LOAD MIDDLEWARES ********** **/

// Default middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Production security
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        // defaultSrc: ['https:'],  // This won't work for local builds
        scriptSrc: ["'self'"],
        styleSrc: ["'unsafe-inline'", "'self'", 'https://fonts.googleapis.com'],
        objectSrc: ["'none'"],
        reportUri: 'https://cspreport.bnguyensn.com'
    }
}));

// The first middleware
app.use((req, res, next) => {
    //console.log(`Received ${req.method} request`);
    next();
});

// The folder where generated production client files are
app.use(express.static(path.join(__dirname, 'dist'), {
    maxAge: 31536000
}));

// After loading the router modules above, we attach website paths to them
// This is just like loading a middleware
app.use('/', index);
app.use('/login', login);
app.use('/chat', chat);

/** ********** ERROR HANDLING ********** **/

// Catch 404
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function (err, req, res, next) {
    if (res.headersSent) return next(err);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/** ********** START THE APP ********** **/

app.listen(app.get('port'), () => {
    console.log(`app live on port ${app.get('port')}`)
});

module.exports = app;