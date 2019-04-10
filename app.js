// BASE SETUP
// =============================================================================
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const helmet = require('helmet')
const uuid = require('uuid')
const MongoStore = require('connect-mongo')(session)
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const cookieParser = require('cookie-parser')
const config = require('./config/config')
const router = require('./routes/router')
//  DATABASE CONNECTION
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/
const dbIgnored = require('./database/mongo')
const app = express()
// SWAGGER
app.use(config.app.prefix+'/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

let whitelist = config.cors.whitelist

let corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    preflightContinue: false,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Total-Count', 'x-access-token', 'Content-Range'],
}
const checkCORS = (config.cors.enabled)?config.cors.enabled : false
checkCORS?app.options('*', cors(corsOptions)):app.use(cors())
//  BODYPARSER
//  Node.js body parsing middleware.
//  Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(bodyParser.json())
app.use(cookieParser())
//  HELMET
//  Helmet helps you secure your Express apps by setting various HTTP headers
let helmetOpts = (config.helmet)?config.helmet.options : {frameguard: false}
app.use(helmet(helmetOpts))

// Use Mongo Store for Session data storage
const store = new MongoStore({
    url: process.env.MONGO_URL?process.env.MONGO_URL:config.mongo.mongodb_session_store_url + config.mongo.session_db_name + config.mongo.session_db_options,
    ttl: config.cookie.validity,
    autoRemove: 'native', // Default
})

//  EXPRESS-SESSION && MONGOSTORE
//  MongoDB session store for Express and Connect
//  Simple session middleware for Express
const sess = {
    key: config.cookie.name,
    secret: config.app.secret,
    cookie: {
        domain: '',
        path: config.cookie.path,
        maxAge: config.cookie.validity * 1000,
        httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
    store: store,
    name: config.cookie.name,
    genid: function() {
        return uuid() // use UUIDs for session IDs
    },
}

// Use session
app.use(session(sess))

//  session management
session.Session.prototype.login = (req, user, cb) => {
    try {
        req.session.userInfo = user
        req.session.user = user.email
        cb()
    } catch (error) {
        cb(error)
    }
}

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with prefix defined in config
checkCORS?app.use(config.app.prefix, cors(corsOptions), router):app.use(config.app.prefix, router)
//  START THE SERVER
app.listen((process.env.PORT || config.server.port))
module.exports = app // for testing
