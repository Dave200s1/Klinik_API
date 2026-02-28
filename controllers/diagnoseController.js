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

//UPDATE
exports.updateDiagnose = async (req, res) =>{
    try{
        const id = parseInt(req.params.id)

        const diagnose = await diagnoseRepo.findOneBy({id})
        if(!diagnose){
            return res.status(404).json({message: "Diagnose does not exist"})
        }
        await diagnoseRepo.update({id},req.body)
        const updatedData = await diagnoseRepo.findOneBy({id})

        res.status(200).json({message: "Data has been updated",
            data: updatedData
        })
    }catch(err){
        console.log("FULL ERROR:", err)
        res.status(400).json({message: err.message})
    }
}