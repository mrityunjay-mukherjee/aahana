const kafka = require('kafka-node')
const myEmitter = require('../utility/EventCore')
const Constants = require('../constants/Constants')
const config = require('../config/config')
const connect = config.kafka.connect
let client = new kafka.KafkaClient(connect)
const producer = new kafka.HighLevelProducer(client)

producer.on('ready', () => {
    console.info(`kafka.HighLevelProducer connected to ${connect.kafkaHost}`)
})

producer.on('error', (error) => {
    console.error(error)
    myEmitter.emit(Constants.EVENT_ERROR, error)
})
/**
 * express middleware handler.
 * @param {array} payloads array of payloads to be sent.
 * topid, messages, timestamp should be present in payloads
 */
module.exports.sendMessage = (payloads) => {
    producer.send(payloads, (err, data) => {
        if (err) {
            myEmitter.emit(Constants.EVENT_ERROR, err)
        }
    })
}

module.exports.createPayload = (topic, messages) =>{
    // send error message to kafka
    let _payload = {}
    _payload.topic = topic
    _payload.messages = JSON.stringify(messages)
    _payload.timestamp = Date.now()
    let _payloads = []
    _payloads.push(_payload)
    return _payloads
}
