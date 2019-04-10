const redis = require('../config/config').redis
const redisClient = require('redis').createClient(redis.port, redis.host)

/* redisClient.on('ready', (err) => {
    console.info('redis client is ready to connect to ' + redis.host)
}) */
redisClient.on('connect', (err) => {
    console.info('redis client is connected to ' + redis.host)
})
redisClient.on('reconnecting', (err) => {
    console.info('redis client is reconnecting to ' + redis.host)
})
redisClient.on('warning', (err) => {
    console.info('redis client is in warning to' + redis.host)
})
redisClient.on('error', (err) => {
    console.info('redis client error while connecting to ' + redis.host)
})
redisClient.on('end', (err) => {
    console.info('redis client connection ended to ' + redis.host)
})

module.exports = redisClient
