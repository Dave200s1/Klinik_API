const AppDataSource = require("../data-source")
const Diagnose = require("../models/Diagnose")

const diagnoseRepo = AppDataSource.getRepository(Diagnose)

//CREATE
exports.createDiagnose = async (req,res) =>{
    try{
        const newDiagnose = diagnoseRepo.create(req.body)
        const result = await diagnoseRepo.save(newDiagnose)
        res.status(201).json(result)
    }catch(err){
        res.status(400).json({message: err.message})
    }   
}