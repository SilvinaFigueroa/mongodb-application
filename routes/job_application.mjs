import express, { query } from 'express'
import database from '../db/conn.mjs'
import { ObjectId } from 'mongodb'
import { Query } from 'mongoose'


const router = express.Router()


router.get('/all', async (req, res) => {
    try {
        const db = await database
        let jobCollection = db.collection("Job-application")

        // Fetch all the candidates in an array 
        const allJobs = await jobCollection.find({}).toArray()

        res.status(200).json(allJobs)

    } catch (err) {
        console.error(err)
        res.status(500).send({ message: `Error fetching documents ${err.message}` })
    }
})

router.post('/add', async (req, res) => {
    const { company_id, candidate_id, description, salary } = req.body
    console.log(company_id, candidate_id, description, salary)

    try {
        const db = await database;
        let jobCollection = db.collection("Job-application")
        
        let companyId , candidateId

        try {

            console.log("try/catch with object ID " + company_id)
            companyId = new ObjectId(company_id);
            console.log(`Company ID Object ${companyId}`)

            candidateId = new ObjectId(candidate_id)
            console.log(`Candidate ID Object ${candidateId}`)

        } catch (err) {
            console.error(`Invalid Object ID - ${err.message}`)
            return res.status(400).send({ message: `Invalid Object ID - ${err.message}` })
        }

        // Include posted date 
        let postedOn = new Date()

        const newJob = {
            company_id: companyId,
            candidate_id: candidateId,
            description: description,
            posted_on: postedOn
        }

        // Add salary if exist 
        if (salary) { newJob.salary = salary }

        // Print the whole object and the type of each element
        console.log('Job to be posted:', JSON.stringify(newJob, null, 2));
        for (const [key, value] of Object.entries(newJob)) {
            console.log(`Type of ${key}: ${typeof value}`);
        }

        // Insert newJob to collection
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

router.delete('/delete/', async (req,res)=> {

    try {
        const { id } = req.body;
        let objectId
        
        try {
            objectId = new ObjectId(id)
        }catch(err){
            res.status(400).send(`The ID is incorrect or doesn't exits - ${err.message}`)
            return
        }   

        const db = await database
        let jobCollection = db.collection("Job-application")
        let query = { _id: objectId };

        // find the Id object on the collection
        let result = await jobCollection.findOne(query);

        if (!result) {
            throw error('Not Found', 404);
        } else {
            await jobCollection.deleteOne(query)
            res.status(200).json({ message: 'Document deleted successfully', deletedDocument: result });
        }
    } catch (err) {
        console.log(err);
        res.status(err.status).send(err.message);
    }

})

router.patch('/update/', async (req,res)=> {

    const { id, company_id, candidate_id, description, salary, posted_on } = req.body
    console.log(id, company_id, candidate_id, description, salary, posted_on)
        
    if(!id){
        return res.status(400).send('The ID of the record to be edited is mandatory')
    }

    let recordId;

    try {
        recordId = new ObjectId(id)
    } catch (err) {
        return res.status(400).send('Record ID is not valid');
    }

    // Creating an object with the updated fields
    const updates = {};
    if (company_id) updates.company_id = new ObjectId(company_id);
    if (candidate_id) updates.candidate_id = new ObjectId(candidate_id);
    if (description) updates.description = description;
    if (salary) updates.salary = salary;
    if (posted_on) updates.posted_on = new Date(posted_on);
        
    try{
        const db = await database
        let jobCollection = db.collection("Job-application")
        let query = { _id: recordId }
        console.log(query)

        // find the Id object on the collection
        let result = await jobCollection.findOne(query)

        if(!result){return res.status(404).send('Record not found')}

        // update record fields
        await jobCollection.updateOne(query, { $set: updates })

        let updatedRecord = await jobCollection.findOne(query)
        console.log(updatedRecord)
        res.status(200).json({ message: 'Document updated successfully', updated_fields : updates, updated_Record : updatedRecord})

        }catch(err){
            res.status(400).send(`ERROR! The record was not updated: - ${err.message}`)
            return
        }   

})

export default router