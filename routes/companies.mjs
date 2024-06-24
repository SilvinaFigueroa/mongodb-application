import express from 'express'
import database from '../db/conn.mjs'

const router = express.Router()

router.get('/all', async (req, res) => {
    try {
        const db = await database
        let companyCollection = db.collection("Company")

        // Fetch all the candidates in an array 
        const allCompanies = await companyCollection.find({}).toArray()

        res.status(200).json(allCompanies)

    } catch (err) {
        console.error(err)
        res.status(500).send({ message: `Error fetching documents ${err.message}` })
    }
})


router.post('/add', async (req, res) => {
    const {name, location, employees} = req.body
    console.log(name, location,employees)

    try {
        const db = await database;
        let companyCollection = db.collection("Company")

        const newCompany = {name} 
        //Add employees and location to the new company if exist 
        if (employees) { newCompany.employees = employees }
        if (location) { newCompany.location = location }


        let result = await companyCollection.insertOne(newCompany)
        console.log(`Candidate inserted ${newCompany}`)

        if (!result.acknowledged || !result.insertedId) {
            throw new Error("Failed to insert document");
        }

        res.status(201).json(newCompany)

    } catch (err) {
        if (err.name === 'MongoError' && err.code === 121) {
            res.status(400).send({ message: "Validation error: " + err.message })
        } else {
            res.status(500).send({ message: `Error when adding document: ${err.message}` })
        }
    }
})



export default router