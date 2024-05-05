const express = require('express')
const { config } = require('dotenv')

config()


const app = express()
app.use(express.json());

const APP_PORT = process.env.PORT || 8080
const APP_URL = process.env.URL || `http://localhost:${APP_PORT}`


app.get('/', async (req, res) => {
    
    const connectionString = process.env.SUPABASE_URI
    const postgres = require('postgres')
    const sql = postgres(connectionString)
    
    // select * from users
    const users = await sql`select * from users`
    
    res.json({ users })
        
})

app.listen(APP_PORT, () => console.info(`Servidor rodando em ${APP_URL}`))

module.exports = app