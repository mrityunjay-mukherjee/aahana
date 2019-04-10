const Movies = require('../repository/Movies')
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
    _q.isActive = true
    Movies.get(_q, (err, doc)=>{
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
    Movies.getOne(_id, (err, doc)=>{
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
    Movies.updateOne(_id, data, (err, doc)=>{
        if (err) return cb(err, null)
        //  console.log(doc)
        cb(null, doc)
    })
}
/**
 * update many Movies object from mongo.
 * @param {object} _q The id of the object to be updated.
 * @param {object} data The data to be updated.
 * @param {object} cb The callback function.
 */
module.exports.update = (_q, data, cb) =>{
    Movies.update(_q, data, (err, doc)=>{
        if (err) return cb(err, null)
        //  console.log(doc)
        cb(null, doc)
    })
}
/**
 * set Movies object as inActive in mongo.
 * @param {object} _id The id of the object to be updated.
 * @param {object} cb The callback function.
 */
module.exports.deleteOne = (_id, cb) =>{
    //  console.log(_id)
    Movies.updateOne(_id, {isActive: false}, (err, doc)=>{
        if (err) return cb(err, null)
        //  console.log(doc)
        cb(null, doc)
    })
}
