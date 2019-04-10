const EventEmitter = require('events')
const myEmitter = new EventEmitter()
const Constants = require('../constants/Constants')
const Producer = require('./Producer')
// Services
const Movies = require('../services/Movies')
// move to service
const Request = require('../services/Request')
/**
 * Event Handler
 *  @param {String} event event name.
 *  @param {object} object passed to the event.
 */
myEmitter.on(Constants.EVENT_ERROR, (data) => {
    console.error(data)
    Producer.sendMessage(Producer.createPayload(Constants.EVENT_ERROR, data))
    //  handle error here
})
/**
 * Event Handler to create a movie
 *  @param {String} event event name.
 *  @param {object} object passed to the event.
 */
myEmitter.on(Constants.EVENT_CREATE_MOVIE, (data) => {
    Movies.create(data, (err, data) => {
        if (err) myEmitter.emit(Constants.EVENT_ERROR, err)
        Producer.createPayload(Constants.EVENT_ERROR, data)
        Producer.sendMessage(_payloads)
    })
})
/**
 * Event Handler to create a movie
 *  @param {String} event event name.
 *  @param {object} object passed to the event.
 */
myEmitter.on(Constants.EVENT_DELETE_MOVIE, (_id) => {
    Movies.deleteOne(_id, (err, data)=>{
        if (err) myEmitter.emit(Constants.EVENT_ERROR, err)
    })
})
/**
 * Event Handler to create a movie
 *  @param {String} event event name.
 *  @param {object} object passed to the event.
 */
myEmitter.on(Constants.EVENT_UPDATE_MOVIE, (id, data) => {
    Movies.updateOne(id, data, (err, data)=>{
        if (err) myEmitter.emit(Constants.EVENT_ERROR, err)
    })
})
/**
 * Event Handler to create a movie
 *  @param {String} event event name.
 *  @param {object} object passed to the event.
 */
myEmitter.on(Constants.EVENT_UPDATE_MOVIES, (condition, data) => {
    Movies.update(condition, data, (err, data)=>{
        if (err) myEmitter.emit(Constants.EVENT_ERROR, err)
    })
})
/**
 * Event Handler to create a movie
 *  @param {String} event event name.
 *  @param {object} object passed to the event.
 */
myEmitter.on(Constants.EVENT_HTTP_REQUEST, (data) => {
    // console.log(data)
    let _request = {
        headers: data.headers,
        url: data.url,
        method: data.method,
        ip: data.headers['x-forwarded-for'] ||
        data.connection.remoteAddress ||
        data.socket.remoteAddress ||
        (data.connection.socket ? data.connection.socket.remoteAddress : null),
    }
    Request.create(_request, (err, data)=>{})
})

module.exports = myEmitter
