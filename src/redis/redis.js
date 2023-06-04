const redis = require("redis");

const { promisify } = require("util");

//1. Connect to the redis server

const redisClient = redis.createClient({
    host: 'redis-19886.c301.ap-south-1-1.ec2.cloud.redislabs.com', // Redis server host
    port: 19886, // Redis server port
    // Additional options if needed
    password: '0PfUqvmRQJsR3BrrUFCEUs8ZOTAzwmtc'
  });

  redisClient.on('connect', () => {
    console.log('Connected to Redis');
  });
  
  redisClient.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
  });
  



const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

module.exports ={ SET_ASYNC, GET_ASYNC}
