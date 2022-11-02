require('dotenv').config();

const express = require('express');
const { Consumer } = require('sqs-consumer');
const app = express();
app.use(express.json());

const AWS = require('aws-sdk');
const { promisify } = require('util');

AWS.config.update({ region: 'us-east-1' });

const sqs = new AWS.SQS({ endpoint: 'http://localhost:4566' });

sqs.receiveMessage = promisify(sqs.receiveMessage);

const QueueUrl = 'http://localhost:4566/000000000000/poc-queue';

const receiveParams = {
  QueueUrl,
  MaxNumberOfMessages: 1
};

async function receive() {
  try {
    const queueData = await sqs.receiveMessage(receiveParams);
  if (
      queueData &&
      queueData.Messages &&
      queueData.Messages.length > 0
    ) {
      const [firstMessage] = queueData.Messages;
      console.log('RECEIVED: ', firstMessage);
      const deleteParams = {
        QueueUrl,
        ReceiptHandle: firstMessage.ReceiptHandle
      };
      sqs.deleteMessage(deleteParams);
    } else {
      console.log('waiting...');
    }
  } catch (e) {
    console.log('ERROR: ', e);
  }
}

setInterval(receive, 500);

module.exports = app;
