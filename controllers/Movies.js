const Movies = require('../services/Movies')
const Constants = require('../constants/Constants')
const MyEmmiter = require('../utility/EventCore')
const redisClient = require('../utility/RedisHandler')
/**
 * express middleware handler.
 * @param {object} req express middleware request object.
 * @param {object} res express middleware response object
 * @param {object} next express middleware next object
 */
module.exports.create = (req, res, next) => {
    const _obj = getBody(req)
    // move to async create if required, else we need the id of the created document
    // MyEmmiter.emit(Constants.EVENT_CREATE_MOVIE, _obj)
    // //send response
    // res.status(Constants.HTTP_201).send({success: true, error: false, message: Constants.MSG_REQUESTED, data: {}})
    Movies.create(_obj, (err, data)=>{
        if (err) return next(err)
        // send response
        res.status(Constants.HTTP_201).send({success: true, error: false, message: Constants.MSG_CREATED, data: {id: data._id}})
    })
}
/**
 * express middleware handler.
 * @param {object} req express middleware request object.
 * @param {object} res express middleware response object
 * @param {object} next express middleware next object
 */
module.exports.read = (req, res, next) => {
    const _id = getID(req)
    Movies.getOne(_id, (err, data)=>{
        if (err) return next(err)
        // send response
        res.status(Constants.HTTP_200).send({success: true, error: false, message: Constants.MSG_FOUND, data: data})
    })
}
/**
 * express middleware handler.
 * @param {object} req express middleware request object.
 * @param {object} res express middleware response object
 * @param {object} next express middleware next object
 */
module.exports.searchByName = (req, res, next) => {
    const _id = getID(req)
    Movies.get({name: {$regex: _id, $options: 'i'}}, (err, data)=>{
        if (err) return next(err)
        // send response
        res.status(Constants.HTTP_200).send({success: true, error: false, message: Constants.MSG_FOUND, data: data})
    })
}
/**
 * express middleware handler.
 * @param {object} req express middleware request object.
 * @param {object} res express middleware response object
 * @param {object} next express middleware next object
 */
module.exports.searchByYear = (req, res, next) => {
    const _id = getID(req)
    Movies.get({year: _id}, (err, data)=>{
        if (err) return next(err)
        // send response
        res.status(Constants.HTTP_200).send({success: true, error: false, message: Constants.MSG_FOUND, data: data})
    })
}
/**
 * express middleware handler.
 * @param {object} req express middleware request object.
 * @param {object} res express middleware response object
 * @param {object} next express middleware next object
 */
module.exports.updateOne = (req, res, next) => {
    const _id = getID(req)
    const _obj = getBody(req)
    MyEmmiter.emit(Constants.EVENT_UPDATE_MOVIE, _id, _obj)
    // send response
    res.status(Constants.HTTP_200).send({success: true, error: false, message: Constants.MSG_REQUESTED, data: {}})
    // Movies.updateOne(_id, _obj, (err, data)=>{
    //     if (err) return next(err)
    //     //send response
    //     res.status(Constants.HTTP_200).send({success: true, error: false, message: `${_id} ${Constants.MSG_UPDATED}`, data: data})
    // })
}
/**
 * express middleware handler.
 * @param {object} req express middleware request object.
 * @param {object} res express middleware response object
 * @param {object} next express middleware next object
 */
module.exports.update = (req, res, next) => {
    const _filter = getFilters(req)
    const _obj = getBody(req)
    MyEmmiter.emit(Constants.EVENT_UPDATE_MOVIES, _filter, _obj)
    // send response
    res.status(Constants.HTTP_200).send({success: true, error: false, message: Constants.MSG_REQUESTED, data: {}})
    // Movies.update(_filter, _obj, (err, data)=>{
    //     if (err) return next(err)
    //     //send response
    //     res.status(Constants.HTTP_200).send({success: true, error: false, message: Constants.MSG_UPDATED, data: data})
    // })
}
/**
 * express middleware handler.
 * @param {object} req express middleware request object.
 * @param {object} res express middleware response object
 * @param {object} next express middleware next object
 */
module.exports.deleteOne = (req, res, next) => {
    const _id = getID(req)
    MyEmmiter.emit(Constants.EVENT_DELETE_MOVIE, _id)
    // send response
    res.status(Constants.HTTP_200).send({success: true, error: false, message: Constants.MSG_REQUESTED, data: _id})
    // Movies.deleteOne(_id, (err, data)=>{
    //     if (err) return next(err)
    //     //send response
    //     res.status(Constants.HTTP_200).send({success: true, error: false, message: Constants.MSG_DELETED, data: data})
    // })
}
/**
 * express middleware handler.
 * @param {object} req express middleware request object.
 * @param {object} res express middleware response object
 * @param {object} next express middleware next object
 */
module.exports.query = (req, res, next) => {
    const _filter = getFilters(req) || {}
    let _rKey = _filter
    // check if you want to use redis here
    redisClient.getFromRedis(_rKey, (err, data) => {
        // check in redis, if not available get from mongo and then set in redis
        if (!data) {
            // get from mongo
            Movies.get(_filter, (err, data) => {
                if (err) return next(err)
                // send response
                res.status(Constants.HTTP_200).send({
                    success: true,
                    error: false,
                    message: Constants.MSG_FOUND,
                    data: data,
                })
                redisClient.setInRedis(_rKey, data, (err, data) => {})
            })
        } else {
            // send from redis
            res.status(Constants.HTTP_200).send({
                success: true,
                error: false,
                message: Constants.MSG_FOUND,
                data: data,
            })
        }
    })
}
/**
 * returns the id
 * @param {object} req express middleware request object.
 * @return {object} the id.
 */
getID = (req) => req.body.id || req.params.id
/**
 * returns the body
 * @param {object} req express middleware request object.
 * @return {object} the body
 */
getBody = (req) => req.body
/**
 * returns the filters
 * @param {object} req express middleware request object.
 * @return {object} the filters.
 */
getFilters = (req) => req.query.filter
