const { Pool } = require('pg');
const { config } = require('dotenv');
config();

const connectionString = process.env.SUPABASE_URI;
const db = new Pool({ connectionString })

module.exports = db