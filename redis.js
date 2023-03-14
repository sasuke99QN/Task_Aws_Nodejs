'use strict'
const redis = require('redis')

const REDIS_PORT = process.env.PORT || 6379; //crete port

const client = redis.createClient(REDIS_PORT);

client.on('connect', function () {
    console.log('Connected!');
});

client.on('error', err => {
    console.log('Unable to connect to redis', err);
})

client.on('connect', () => {
    console.log('Redis Connection has been established successfully.')
})

const connect = async () => {
    await client.connect()
}

connect()
module.exports = client