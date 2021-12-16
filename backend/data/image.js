const Promise = require('bluebird');
const redis = require('redis');

const client = redis.createClient({
    host: 'cache',
    port: 6379
});
Promise.promisifyAll(redis.RedisClient.prototype);

async function addImage(userid, image) {
    if (!userid) {
        throw "userid not provided";
    }
    userid = userid.toString();
    await client.setAsync(userid, image);
    return image;
}

async function getUserImage(userid) {
    if (!userid) {
        throw "userid not provided";
    }
    userid = userid.toString();

    return await client.getAsync(userid);
}
module.exports = {
    addImage,
    getUserImage
}