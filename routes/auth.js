const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AppDataSource = require("../data-source")
const verifyToken = require("../middleware/verifyToken")

router.post("/register",async(req,res)=>{
    try{
        const {name,email,password} = req.body

        //small validation
        if(!name || !email || !password){
            return res.status(400).json({error: "Alle Felder ausfüllen"})
        }

        if(password.length < 7){
            return res.status(400).json({error: "Password muss mindestens 7 Zeichne beinhalten "})
        }
        const userRepo = AppDataSource.getRepository("User")


        const exitingUser = await userRepo.findOneBy({email})
        if(exitingUser){
            return res.status(400).json({error: "E-mail wurde bereits vergeben !"})
        }

        //Hashing password
        const salt = await bcrypt.genSalt(12)
        const hashedPass = await bcrypt.hash(password,salt)

        const newUser = {name, email, password: hashedPass}
        await userRepo.save(newUser)
        
        res.status(201).json({message: "Benutzer erfolgreich angelegt",user:{name,email}})

    }catch(error){
        console.log(error)
        res.status(500).json({error: "Interner Serverfehler"})
    }
})


module.exports = router