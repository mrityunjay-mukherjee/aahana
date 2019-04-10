const client = require('../database/redis')
const hash = require('object-hash')

getFromRedis = (_obj, cb) => {
    let _key = hash(_obj)
    client.get(_key, (err, result)=>{
        if (err) {
            cb(err, null)
        } else {
            cb(null, JSON.parse(result))
        }
    })
}
setInRedis = (_obj, value, cb) => {
    let _key = hash(_obj)
    let _data = JSON.stringify(value)
    client.set(_key, _data, 'EX', 60, (err, result)=>{
        if (err) {
            cb(err, null)
        } else {
            cb(null, result)
        }
    })
}

module.exports = {getFromRedis, setInRedis}
