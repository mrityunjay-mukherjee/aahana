const mongoose = require('mongoose')
const Schema = mongoose.Schema
const modelName = 'movie'

const customSchema = new Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
        enum: ['movie', 'series', 'episode'],
        default: 'movie',
    },
    year: {
        type: Number,
    },
    plot: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
})
customSchema.set('autoIndex', false)
// create index
let customIndex = {}
customIndex.name = 1
customIndex.year = 1
customIndex.isActive = 1

customSchema.index(customIndex)

const customModel = mongoose.model(modelName, customSchema)
module.exports = customModel
