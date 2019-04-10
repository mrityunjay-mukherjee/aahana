const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
    createdAt: {
        type: Schema.Types.Date,
        default: Date.now,
    },
    headers: {
        type: Schema.Types.Mixed,
    },
    method: {
        type: Schema.Types.Mixed,
    },
    url: {
        type: Schema.Types.Mixed,
    },
    ip: {
        type: Schema.Types.Mixed,
    },
})


const Request = mongoose.model('request', requestSchema)
module.exports = Request
