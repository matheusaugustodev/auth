const express = require('express')
const { config } = require('dotenv')
const { Pool } = require('pg')

config()


const app = express()
app.use(express.json());

const APP_PORT = process.env.PORT || 8080
const APP_URL = process.env.URL || `http://localhost:${APP_PORT}`


app.get('/', async (req, res) => {

    // const connectionString = process.env.POSTGRES_VERCEL_URI
    const connectionString = process.env.SUPABASE_URI

    const pool = new Pool({
        connectionString,
    })

    pool.connect((err) => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }   
    })
  
    // res.json({ message: 'Hello World' }) 
    // select * from users
    
    const { rows: users } = await pool.query('select * from users')
    res.json({ users })
        
})

app.listen(APP_PORT, () => console.info(`Servidor rodando em ${APP_URL}`))

module.exports = app