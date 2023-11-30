// Import AWS SDK
const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
    region: 'us-west-2', // Update this with your region
    accessKeyId: 'your-access-key-id', // Update this with your access key id
    secretAccessKey: 'your-secret-access-key' // Update this with your secret access key
});

// Create DynamoDB service object
const ddb = new AWS.DynamoDB.DocumentClient();

// Define table name
const tableName = 'Tasks'; // Update this with your DynamoDB table name

// API object
const api = {
    // Function to create a task
    createTask: async (task) => {
        const params = {
            TableName: tableName,
            Item: task
        };

        try {
            await ddb.put(params).promise();
            return { success: true, task };
        } catch (error) {
            console.error(error);
            return { success: false, error };
        }
    },

    // Function to get tasks
    getTasks: async () => {
        const params = {
            TableName: tableName
        };

        try {
            const data = await ddb.scan(params).promise();
            return { success: true, tasks: data.Items };
        } catch (error) {
            console.error(error);
            return { success: false, error };
        }
    },

    // Function to update a task
    updateTask: async (task) => {
        const params = {
            TableName: tableName,
            Key: { id: task.id },
            UpdateExpression: 'set description = :d, completed = :c',
            ExpressionAttributeValues: {
                ':d': task.description,
                ':c': task.completed
            },
            ReturnValues: 'UPDATED_NEW'
        };

        try {
            await ddb.update(params).promise();
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, error };
        }
    },

    // Function to delete a task
    deleteTask: async (task) => {
        const params = {
            TableName: tableName,
            Key: { id: task.id }
        };

        try {
            await ddb.delete(params).promise();
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, error };
        }
    }
};

// Export API object
module.exports = api;
