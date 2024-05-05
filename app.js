const express = require('express')
const { config } = require('dotenv')
const { MongoClient } = require('mongodb')

config()

const app = express()
app.use(express.json());

const APP_PORT = process.env.PORT || 8080
const APP_URL = process.env.URL || `http://localhost:${APP_PORT}`

async function connectToCluster(uri) {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
 
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }

const uri = process.env.MONGODB_URI
const client = connectToCluster(uri)


app.get('/', (req, res) => res.json({ message: 'Hello World!' }))

app.listen(APP_PORT, () => console.info(`Servidor rodando em ${APP_URL}`))

module.exports = app