const AppDataSource = require("../data-source")
const Patient = require("../models/Patient")


const patientRepo = AppDataSource.getRepository(Patient)

//CREATE
exports.createPatient = async (req, res)=>{
    try{
        const newPatient = patientRepo.create(req.body)
        const result = await patientRepo.save(newPatient)
        res.status(201).json(result)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}


