import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import candidates from './routes/candidates.mjs'
import companies from './routes/companies.mjs'
import jobs from './routes/job_application.mjs'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Body-parser middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Include Cross-Origin Resource Sharing
app.use(cors())

// Set routes
app.use('/candidates', candidates)
app.use('/companies', companies)
app.use('/jobs', jobs)


app.get('/', (req, res) => {
  res.send('SBA Settings');
});


// Global error handling middlware
app.use((err,req,res,next)=>{
  res.status(500).send(`Connection failed ${err}`)
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})