const express = require("express")
const router = express.Router()
const { createUser } = require("../api/user/userControlller")
const { createStudent } = require("../api/student/studentController")



router.post("/createuser", createUser)
router.post("/createstudent", createStudent)

module.exports = router