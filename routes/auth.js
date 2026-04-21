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


router.use("/login",async(req,res)=>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({error: "E-mail & Password sind erforderlich"})
        }
        const userRepo = AppDataSource.getRepository("User")
        const user = await userRepo.findOneBy({email})

        if(!user){
            return res.status(400).json({error: "E-mail ist falsch"})
        }


        const validPass = await bcrypt.compare(password,user.password)
        if(!validPass){
            return res.status(400).json({error: "Password ist falsch"})
        }

        //creating a jwt

        const token = jwt.sign(
            {userId: user.id,   email: user.email  },
            process.env.TOKEN_SECRET,
            {expiresIn: "7d"}
        )

        res.status(200).json({
            message: "Login erfolgreich",
            token,
            user: {id: user.id, name: user.name, email: user.email}
        })

    }catch(error){
        console.error(error)
        res.status(500).json({ error: "Interner Serverfehler" })
    }
})

module.exports = router