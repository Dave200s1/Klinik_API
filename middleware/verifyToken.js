const jwt = require("jsonwebtoken")

function verifyToken (req, res, next){
    const token = req.header("x-auth-token")
    if(!token){
        return res.status(401).json({error: "Kein Token, Zufriff wurde verweigert"})            
    }

    try{
        const verfied = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verfied
        next()
    }catch(error){
        res.status(400).json({ error: "Ungültiger Token" })
    }
}

module.exports = verifyToken