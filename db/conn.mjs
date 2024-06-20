
import {MongoClient} from "mongodb"
import dotenv from 'dotenv'

// This line tells the dotenv package to load the variables from your .env file into the environment.
dotenv.config()

const client = new MongoClient(process.env.ATLAS_URI)

let connection

try {
    connection = await client.connect()
    console.log("Connected to Mongo")
}catch(error){
    console.log(error)
}

let database = connection.db("SBA-TEST")

export default database