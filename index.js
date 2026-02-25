const express = require("express")
const AppDataSource = require("./data-source")
const doctorController = require("./controllers/doctorController")

const app = express()
app.use(express.json())

AppDataSource.initialize()
    .then(() =>{
        app.get("/", doctorController.welcomeMessage)
        app.get("/api/doctors/", doctorController.getAllDoctors)
        app.post("/api/doctor/create", doctorController.createDoctor)
        app.put("/api/doctor/update/:id", doctorController.updateDoctor)
        app.get("/api/doctor/:id", doctorController.getDoctorById)
        app.delete("/api/doctor/:id", doctorController.deleteDoctorById)
        app.listen(3000, ()=>{
            console.log("Server is running on port 3000")
        })
    })
    .catch((err) => console.log(err));