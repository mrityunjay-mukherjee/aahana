const mongoose = require('mongoose')
const config = require('../config/config')
// const autoIncrement = require('mongoose-auto-increment')

// Set up mongoose connection
const mongoDB = process.env.MONGO_URL?process.env.MONGO_URL:config.mongo.mongodb_url + config.mongo.db_name + config.mongo.db_options
mongoose.connect(mongoDB, {useNewUrlParser: true})
mongoose.Promise = global.Promise
const mongodb = mongoose.connection
//  autoIncrement = require('mongoose-auto-increment')
// autoIncrement.initialize(mongodb)
// CONNECTION EVENTS
// When successfully connected
mongodb.on('connected', function() {
    console.info('Mongoose default connection open to ' + mongoDB)
})
// If the connection throws an error
mongodb.on('error', function(err) {
    console.info('Mongoose default connection error: ' + err)
})
// When the connection is disconnected
mongodb.on('disconnected', function() {
    console.info('Mongoose default connection disconnected')
})
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongodb.close(function() {
        console.info('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})
module.exports = {
    mongodb,
}
