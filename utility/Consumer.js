const kafka = require('kafka-node')
const MyEmmiter = require('../utility/EventCore')
const Constants = require('../constants/Constants')
const config = require('../config/config')
const Consumer = kafka.Consumer
const connect = config.kafka.connect
const topics = config.kafka.topics
const options = config.kafka.options
let client = new kafka.KafkaClient(connect)

let consumer = new Consumer(
    client,
    topics,
    options
)

consumer.on('message', (message) => {
    console.log(message)
    const _topic = message.topic
    let _data = JSON.parse(message.value)
    // do something here per topic
    console.log(_topic, _data)
})

consumer.on('error', (err) => {
    console.error(err)
    MyEmmiter.emit(Constants.EVENT_ERROR, err)
})
