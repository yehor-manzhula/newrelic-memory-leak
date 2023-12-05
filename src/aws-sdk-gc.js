require('newrelic');

const { setFlagsFromString } = require('v8');
const { runInNewContext } = require('vm');

const { ReceiveMessageCommand, SQSClient } = require('@aws-sdk/client-sqs');

setFlagsFromString('--expose_gc');
const gc = runInNewContext('gc');

(function main({ queueName }) {
    if (!queueName) {
        throw new Error('queueName is not defined');
    }

    const sqsClient = new SQSClient({
        endpoint: 'http://localhost:4566',
        region: 'us-west-2',
        credentials: {
            accessKeyId: 'TEST',
            secretAccessKey: 'TEST',
        },
    });

    let pollingTimeoutId = null;

    const poll = () => {
        sqsClient.send(new ReceiveMessageCommand({
            WaitTimeSeconds: 0,
            VisibilityTimeout: 30,
            MaxNumberOfMessages: 10,
            QueueUrl: `http://sqs.us-west-2.localhost.localstack.cloud:4566/000000000000/${queueName}`,
        })).then(() => {

        }).catch((error) => {
            console.log(`Error ${error.message}`);
        }).finally(() => {
            if (pollingTimeoutId) {
                clearTimeout(pollingTimeoutId);
            }

            pollingTimeoutId = setTimeout(poll, 0);

            gc();
        });
    };

    poll();

    console.log(`Vanilla aws-sdk with gc started for queue: ${queueName}`);
}({
    queueName: process.env.QUEUE_NAME,
}));
