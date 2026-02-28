# 🏥 KlinikAPI

A RESTful Web API built with Node.js, Express and TypeORM
for managing a clinical system with doctors, patients and diagnoses.

The project is designed as a portfolio backend project, following REST principles and a structured layered architecture.

## ✨ Features
* CRUD operations for:
    * Doctors
    * Patients
    * Diagnoses
* Relational data modeling with
  * One-to-Many (Doctor → Patient)
  * One-to-Many (Patient → Diagnose)

## 🛠️ Tech Stack

- Node.js

- Express.js

- TypeORM

- SQLite

- REST Architecture

- Insomnia (API Testing)

---

## 🔍 Endpoints

| Method    | Endpoint                      | Description                                 |
|-----------|-------------------------------|---------------------------------------------|
| `POST`    | `/api/doctor/create`          | Create a new doctor                         |
| `GET`     | `/api/doctors/`               | Reads all doctor records avaible            |
| `PUT`     | `/api/doctor/1`               | Updates the previous doctor record          |
| `DELETE`  | `/api/doctor/1`               | Deletes a specific doctor record            |


### The rest is similar for Patients and Diagnose etc. 

## Test Data JSON
POST
/api/doctor/create

`
{
  "firstname": "John",
  "lastname": "Smith",
  "address": "12 Medical Street",
  "email": "john.smith@clinic.com"
}
`