const jwt = require("jsonwebtoken")
require("dotenv").config()

const authentication = async(req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")

        if (!token) {
            return res.json({
                status: 400,
                success: false,
                message: "token is not valid"
            })
        }

        //varify token 


        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
        console.log("req.user")
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "internal server error"
        })
    }
}
module.exports = authentication