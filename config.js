// Configuration for AWS SDK and DynamoDB
const config = {
    aws_sdk: {
        region: 'us-west-2', // Update this with your region
        accessKeyId: 'your-access-key-id', // Update this with your access key id
        secretAccessKey: 'your-secret-access-key' // Update this with your secret access key
    },
    dynamodb: {
        tableName: 'Tasks' // Update this with your DynamoDB table name
    }
};

// Export the configuration
module.exports = config;
