
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

let database = connection.db("SBA-Mongo")

export default database

// Collections for reference

// db.createCollection("Company", {
//     validator: {
//       $jsonSchema: {
//         bsonType: "object",
//         required: ["name"],
//         properties: {
//           name: {
//             bsonType: "string",
//             description: "Company is a mandatory field and must be text"
//           },
//           location: {
//             bsonType: "string",
//             description: "Location if provided must be text"
//           },
//           "employees": {
//             bsonType: "int",
//             minimum: 0,
//             description: "Employees number: If provided, must be a number greater than or equal to 0"
//           }
//         }
//       }
//     }
//   })
//   { ok: 1 }
//   db.createCollection("Candidate", {
//     validator: {
//       $jsonSchema: {
//         bsonType: "object",
//         required: ["name", "email"],
//         properties: {
//           name: {
//             bsonType: "string",
//             description: "Name must be text and is required"
//           },
//           location: {
//             bsonType: "string",
//             description: "If provided, location must be text"
//           },
//           email: {
//             bsonType: "string",
//             pattern: "^.+@.+\\..+$",
//             description: "Email is required and must follow the format something@mail.com"
//           }
//         }
//       }
//     }
//   })
//   { ok: 1 }
//   db.createCollection("Job-application", {
//     validator: {
//       $jsonSchema: {
//         bsonType: "object",
//         required: ["company_id", "candidate_id", "description"],
//         properties: {
//           company_id: {
//             bsonType: "objectId",
//             description: "Verify the Company ID provided, there is no matching value"
//           },
//           candidate_id: {
//             bsonType: "objectId",
//             description: "Verify the Candidate ID provided, there i no matching value"
//           },
//           description: {
//             bsonType: "string",
//             description: "Description must be a text"
//           },
//           salary: {
//             bsonType: "int",
//             minimum: 0,
//             description: "If provided, Salary must be an integer greater than or equal to 0"
//           },
//           posted_on: {
//             bsonType: "date",
//             description: "Posted on: must be a date"
//           }
//         }
//       }
//     }
//   })