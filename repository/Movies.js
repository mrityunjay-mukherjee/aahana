const Movies = require('../models/Movies')
/**
 * create an new Movies object in mongo.
 * @param {object} data The data to be inserted.
 * @param {object} cb The callback function.
 */
module.exports.create = (data, cb) =>{
    Movies.create(data, (err, doc)=>{
        if (err) return cb(err, null)
        cb(null, doc)
    })
}
/**
 * get an Movies object from mongo.
 * @param {object} _q The query for the object to be retrieved.
 * @param {object} cb The callback function.
 */
module.exports.get = (_q, cb) =>{
    let _select = {}
    _select.name = 1
    _select.plot = 1
    _select.year = 1
    Movies.find(_q).select(_select).exec((err, doc)=>{
        if (err) return cb(err, null)
        //  console.log(doc)
        cb(null, doc)
    })
}
/**
 * get an Movies object from mongo.
 * @param {object} _id The id of the object to be retrieved.
 * @param {object} cb The callback function.
 */
module.exports.getOne = (_id, cb) =>{
    let _select = {}
    _select.name = 1
    _select.plot = 1
    _select.year = 1
    Movies.findById(_id).select(_select).exec((err, doc)=>{
        if (err) return cb(err, null)
        //  console.log(doc)
        cb(null, doc)
    })
}
/**
 * update an Movies object from mongo.
 * @param {object} _id The id of the object to be updated.
 * @param {object} data The data to be updated.
 * @param {object} cb The callback function.
 */
module.exports.updateOne = (_id, data, cb) =>{
    Movies.findByIdAndUpdate(_id, {$set: data}, (err, doc)=>{
        if (err) return cb(err, null)
        //  console.log(doc)
        cb(null, doc)
    })
}
/**
 * update many Movies object from mongo.
 * @param {object} condition The id of the object to be updated.
 * @param {object} data The data to be updated.
 * @param {object} cb The callback function.
 */
module.exports.update = (condition, data, cb) =>{
    Movies.updateMany(condition, {$set: data}, (err, doc)=>{
        if (err) return cb(err, null)
        //  console.log(doc)
        cb(null, doc)
    })
}
