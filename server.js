import express from 'express'
import dotenv from 'dotenv'
import database from './db/conn.mjs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('SBA Settings');
  });


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})