const AWS = require('aws-sdk');

class DynamoDBService {

  constructor() {
    this._connection = new AWS.DynamoDB.DocumentClient();
  }

  saveTo(table, item){
    return this._connection.put({
      TableName: table,
      Item: item
    }).promise();
  }
}

module.exports = DynamoDBService;
