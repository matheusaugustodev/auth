const express = require('express')
const { config } = require('dotenv')
const UserRouter = require('./src/routes/user')

config()
const app = express()
app.use(express.json());
app.use(UserRouter)

const APP_PORT = process.env.PORT || 8080
const APP_URL = process.env.URL || `http://localhost:${APP_PORT}`

app.get('/', async (req, res) => res.json({ message: 'Hello World' }))

app.listen(APP_PORT, () => console.info(`Servidor rodando em ${APP_URL}`))

module.exports = app