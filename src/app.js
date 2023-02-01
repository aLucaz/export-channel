const DynamoDBService = require('./aws/dynamodb');
const SQSService = require('./aws/sqs');
const Time = require('./helper/Time');
const Status = require('./constant/exportStatus');

const handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log(JSON.stringify(body, null, 2));
  if (body.isAsync) {
    const item = {
      user: body.userName,
      creation_date: body.creationDate,
      report_type: body.reportType,
      file_name: body.fileName,
      expiration_date: Time.getUnixEpochTimeFromDateString(body.expirationDate),
      status: Status.ON_HOLD
    };
    console.log(JSON.stringify(item, null, 2));
    // creating a row in dynamo db
    const dynamoDB = new DynamoDBService();
    const row = await dynamoDB.saveTo(
      'export_request_metadata',
      item
    );
    console.log(JSON.stringify(row, null, 2));
    // sending message to SQS
    const message = {
      isAsync: body.isAsync,
      reportFileType: body.reportFileType,
      fileName: body.fileName,
      user: body.userName,
      creationDate: body.creationDate,
      filters: body.filters
    }
    const sqs = new SQSService();
    const sqsResponse = await sqs.sendMessage(
      'qas-flow-export',
      message
    )
    console.log(JSON.stringify(sqsResponse, null, 2));
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'OK',
      }),
    };
  }
};

module.exports = {
  handler
}
