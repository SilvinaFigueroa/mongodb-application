import express from 'express'
import database from '../db/conn.mjs'
import { ObjectId } from 'mongodb'


const router = express.Router()


router.post('/add', async (req, res) => {
    const { company_id, candidate_id, description, salary } = req.body
    console.log(company_id, candidate_id, description, salary)


    try {
        const db = await database;
        let jobCollection = db.collection("Job-application")
        let companyId , candidateId

        try {

            console.log("try/catch with object ID " + company_id)
            companyId = new ObjectId(company_id)
            console.log(`Company ID Object ${companyId}`)
            candidateId = new ObjectId(candidate_id)
            console.log(`Candidate ID Object ${candidateId}`)

        } catch (err) {
            console.error(`Invalid Object ID - ${err.message}`)
            return res.status(400).send({ message: `Invalid Object ID - ${err.message}` })
        }

        // Include posted date 
        let postedOn = new Date();

        const newJob = {
            company_id,
            candidate_id,
            description,
            posted_on: postedOn
        };

        // Add salary if exist 
        if (salary) { newJob.salary = salary }

        // Print the whole object and the type of each element
        console.log('Job to be posted:', JSON.stringify(newJob, null, 2));
        for (const [key, value] of Object.entries(newJob)) {
            console.log(`Type of ${key}: ${typeof value}`);
        }

        let result = await jobCollection.insertOne(newJob)
        console.log(`Jobb-application inserted ${result}`)

        res.status(201).json(newJob)


    } catch (err) {
        console.error(err)
        if (err.name === 'MongoError' && err.code === 121) {
            res.status(400).send({ message: `Validation error: ${err.message}` })
        } else {
            res.status(500).send({ message: `Error when adding document: ${err.message}` })
        }
    }

})



export default router