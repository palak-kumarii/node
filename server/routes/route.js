const express = require("express")
const router = express.Router()
    // const { createUser } = require("../api/user/userControlller")
const { createStudent } = require("../api/student/studentController")
const { createUser, loginUser } = require("../api/user/userControlller")


router.post("/createuser", createUser)
router.post("/createstudent", createStudent)
router.post("/loginuser", loginUser)

module.exports = router