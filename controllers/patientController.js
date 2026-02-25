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

//READ
exports.readPatients = async(req, res)=>{
    try{
        const id = parseInt(req.params.id)
        const patentData=  await patientRepo.findOneBy({ id });
        if(isNaN(id)){
            res.status(404).json({message: "patient cannot be found"})
        }
        res.status(200).json(patentData)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

//UPDATE
exports.updatePatient = async(req,res)=>{
    try{
        const id = parseInt(req.params.id)

        const patient = await patientRepo.findOneBy({id})
        if(!patient){
            return res.status(404).json({message: "Patient doesnt exist"})
        }
        await patientRepo.update({id}, req.body)
        const updatedDate = await patientRepo.findOneBy({id})

        res.status(200).json({message: "Data has been successfully updated",
            data: updatedDate
        })
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

//DELETE
exports.deletePatient = async (req, res) =>{
    try{
        const patient = await patientRepo.findAndCountBy({id: parseInt(req.params.id)})
        if(!patient){
            return res.status(404).json({message: "Patient could not be found! Already deleted"})
        }
        await patientRepo.delete(req.params.id)
        res.status(200).json({message: "Patient was deleted"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
}