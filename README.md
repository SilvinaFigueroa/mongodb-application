# MongoDB Application

This application manages candidates, companies, and job applications using MongoDB. It provides APIs to add, retrieve, update, and delete job application records.

## Prerequisites

- Node.js
- MongoDB Atlas or a local MongoDB server
- Postman for testing

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/mongodb-application.git
   cd mongodb-application

2. Install dependencies:
   ```sh
   npm install

4. Create a .env file in the root directory and add your MongoDB URI and replace the user and password with the ones provided:
   ```sh
   ATLAS_URI=mongodb+srv://user:<password>@mongopractice.xfbul2m.mongodb.net/?retryWrites=true&w=majority&
   appName=MongoPractice
   PORT=3000n

5. Start the application:
   ```sh
   npm start

# API Endpoints

## Candidates

### Get all candidates
**URL:** `GET /candidates/all`  
**Description:** Fetches all candidates from the database.

### Add a candidate
**URL:** `POST /candidates/add`  
**Description:** Adds a new candidate to the database.

## Companies

### Get all companies
**URL:** `GET /companies/all`  
**Description:** Fetches all companies from the database.

### Add a company
**URL:** `POST /companies/add`  
**Description:** Adds a new company to the database.

## Job Applications

### Get all job applications
**URL:** `GET /jobs/all`  
**Description:** Fetches all job applications from the database.

### Add a job application
**URL:** `POST /jobs/add`  
**Description:** Adds a new job application to the database.

### Delete a job application
**URL:** `DELETE /jobs/delete`  
**Description:** Deletes a job application from the database.

### Update a job application
**URL:** `PATCH /jobs/update`  
**Description:** Updates a job application in the database.

_________________________________________________________________________________________________________________________________
This README includes the installation instructions, API endpoints, usage instructions for Postman, and database validation rules.




