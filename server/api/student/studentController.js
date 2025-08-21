const Student = require("./studentModel")
const bcrypt = require("bcryptjs")


const createStudent = async(req, res) => {
    try {


        const { name, email, address, phone, password, studentClass } = req.body

        const validation = []

        if (!name || typeof name !== "string") {
            validation.push("name is required and type must be string ")
        }
        if (!email || typeof email !== "string") {
            validation.push("email is required and type must be string ")
        }
        if (!password || typeof password !== "string") {
            validation.push("password is required and type must be string ")
        }
        if (!studentClass || typeof studentClass !== "string") {
            validation.push("studentClass is required and type must be string ")
        }
        if (!address || typeof address !== "string") {
            validation.push("address is required and type must be string ")
        }

        if (!phone || typeof phone !== "string") {
            validation.push("phone is required and type must be string ")
        }

        if (validation.length > 0) {
            return res.status(400).json({
                success: false,
                message: "validation error",
                error: validation
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const student = new Student({
            name: name,
            email: email,
            password: hashedPassword,
            studentClass: studentClass,
            address: address,
            phone: phone
        })

        await student.save()
        res.json({
            status: 201,
            success: true,
            message: "new student is create successfully",
            data: student
        })
    } catch (err) {
        res.json({
            status: 500,
            success: false,
            message: "internal server error",
            error: err.message
        })

    }
}
module.exports = { createStudent }