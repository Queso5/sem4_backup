const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://tejasparatest:tejas%40554@renteasedb.fgzos4c.mongodb.net/rental_listings?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function testConnection() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
    }
}

testConnection();
