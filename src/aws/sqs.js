const AWS = require('aws-sdk');
const Json = require('../helper/Json');

class SQSService {
  constructor() {
    this._connection = new AWS.SQS();
  }

  getQueueUrl(queueName) {
    return this._connection.getQueueUrl({
      QueueName: queueName
    }).promise();
  }

  async sendMessage(queueName, message) {
    const getQueueUrlResult = await this.getQueueUrl(queueName);
    const params = {
      QueueUrl: getQueueUrlResult.QueueUrl,
      MessageBody: Json.toString(message)
    }
    return this._connection.sendMessage(params).promise();
  }
}

module.exports = SQSService;
