const express = require('express')
const { config } = require('dotenv')
const postgres = require('postgres')

config()

const connectionString = process.env.SUPABASE_URI
const sql = postgres(connectionString)

const app = express()
app.use(express.json());

const APP_PORT = process.env.PORT || 8080
const APP_URL = process.env.URL || `http://localhost:${APP_PORT}`


app.get('/', (req, res) => res.json({ message: 'Hello World!' }))

app.listen(APP_PORT, () => console.info(`Servidor rodando em ${APP_URL}`))

module.exports = app