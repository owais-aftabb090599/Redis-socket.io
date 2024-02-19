const { createClient } = require("redis");

const pubRedisClient = createClient();
const subRedisClient = pubRedisClient.duplicate();

module.exports = {
    pubRedisClient,
    subRedisClient
};
