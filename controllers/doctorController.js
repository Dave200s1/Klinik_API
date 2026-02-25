const AppDataSource = require("../data-source")
const Doctor = require("../models/Doctor")

const doctorRepo = AppDataSource.getRepository(Doctor)

//CREATE
exports.createDoctor = async (req, res) =>{
    try{
        
        const newDoctor = doctorRepo.create(req.body)
        const result = await doctorRepo.save(newDoctor)

        res.status(201).json(result)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

//UPDATE
exports.updateDoctor = async (req, res) =>{
    try{
        const id  = parseInt(req.params.id);

        const doctor = await doctorRepo.findOneBy({id});
        if(!doctor){
            return res.status(404).json({message: "Doctor not found"});
        }
        await doctorRepo.update({id}, req.body);
        const updatedData = await doctorRepo.findOneBy({id});

        res.status(200).json({ message: "Data has been updated",
            data: updatedData});
    }catch(err){
        console.log("FULL ERROR:", err); 
        res.status(400).json({message: err.message})
    }
}

//Welcome message
exports.welcomeMessage = async (req, res) =>{
    res.send("Welcome to the server");
}

//READ
exports.getAllDoctors = async (req, res) =>{
    
    const doctors = await doctorRepo.find();
    res.json(doctors)
}

exports.getDoctorById = async (req, res) =>{
    const doctor = await doctorRepo.findOneBy({id: parseInt(req.params.id)})
    if(!doctor){
        return res.status(404).json({message: "Doctor not found"})
    }
    res.json(doctor)
}

//Delete
exports.deleteDoctorById = async (req, res) =>{
    const doctor = await doctorRepo.findAndCountBy({id: parseInt(req.params.id)})
    if(!doctor){
        return res.status(404).json({message: "Doctor already deleted"})
    }
    await doctorRepo.delete(req.params.id)
    res.json({message: "Doctor deleted"})
}
