require('dotenv').config();

const QUEUE_NAME = process.env.admissionSNSQueueName;
const QUEUE_ROUTING_KEY = process.env.admissionSNSRoutingKey;
const APP_HOST = process.env.appHost;

module.exports = { QUEUE_NAME, QUEUE_ROUTING_KEY, APP_HOST };
