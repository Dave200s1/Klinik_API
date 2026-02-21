const AppDataSource = require("../data-source")
const doctorRepo = AppDataSource.getRepository("Doctor")

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


//READ
exports.getAllDoctors = async (req, res) =>{
    const doctors = await doctorRepo.find();
    res.json(doctors)
}

