const Request = require('../repository/Request')
/**
 * create an new Movies object in mongo.
 * @param {object} data The data to be inserted.
 * @param {object} cb The callback function.
 */
module.exports.create = (data, cb) =>{
    Request.create(data, (err, doc)=>{
        if (err) return cb(err, null)
        cb(null, doc)
    })
}
