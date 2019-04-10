const myEmitter = require('../utility/EventCore')
const Constant = require('../constants/Constants')

const RequestLogger = (req, res, next) => {
    myEmitter.emit(Constant.EVENT_HTTP_REQUEST, req)
    next()
}
module.exports = RequestLogger
