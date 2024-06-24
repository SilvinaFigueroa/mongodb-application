import express, { json } from 'express'
import database from '../db/conn.mjs'

const router = express.Router()


router.post('/', async (req, res) => {
    const { name, email, location } = req.body
    console.log(name, email, location)

    try {
        const db = await database;
        let candidateCollection = db.collection("Candidate")

        const newCandidate = { name, email }
        //Add location to the new candidate if exist 
        if (location) { newCandidate.location = location }

        let result = await candidateCollection.insertOne(newCandidate)
        console.log(`Candidate inserted ${newCandidate}`)

        if (!result.acknowledged || !result.insertedId) {
            throw new Error("Failed to insert document");
        }

        res.status(201).json(newCandidate)
        
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 121) {
            res.status(400).send({ message: "Validation error: " + err.message })
        } else {
            res.status(500).send({ message: `Error when adding document: ${err.message}` })
        }
    }
})


export default router