'use strict';
const { func } = require('joi');
const client = require('../redis');

//const redisExpiry = require("redis-expiry");
//const redisSetter = Redis.createClient(process.env.REDIS_URL);
//const redisGetter = Redis.createClient(process.env.REDIS_URL);
//const rexp = redisExpiry(redisSetter, redisGetter);


// set get 
const setRedis = async (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    await client.set(key, value);

};

const getRedis = async (key) => {
    const result = await client.get(key);
    return result;
};

// set get time out
//C1: .timeout(60000) 60s

//C2:
const setRedisTime = async (key, value, timeout) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    await client.setEx(key, timeout, value);

    //await client.expireAt(key,parseInt((+new Date)/1000)+86400);// het han trong vong 24h
}

const getRedisTime = async (key) => {
    const result = await client.getEx(key);
    return result;
    //await client.expireAt(key,parseInt((+new Date)/1000)+86400);// het han trong vong 24h
}

//C3:

// const expireDate = new Date();
// expireDate.setSeconds(expireDate.getSeconds() + 60);
// rexp.set("myKeyByDate", "myValue").at(expireDate); // 60S

// rexp.set("myKeyByCron", "myValue").cron("*/30 * * * * *"); // 30S

// rexp.on(/myKeyBy(.)/, (value, key) => { // restart
//   console.log("Value returned", value, "From key", key);
// });

module.exports = {
    setRedis,
    getRedis,
    setRedisTime,
    getRedisTime
}