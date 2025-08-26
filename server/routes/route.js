const express = require("express")
const router = express.Router()
    // const { createUser } = require("../api/user/userControlller")
const { createStudent } = require("../api/student/studentController")
const { createUser, loginUser, getAllUser, getUserById, updateUserById, deleteUserById } = require("../api/user/userControlller")




router.post("/createuser", createUser)
router.post("/createstudent", createStudent)
router.post("/loginuser", loginUser)
router.get("/getalluser", getAllUser)
router.post("/getuserbyid", getUserById)
    // router.post("/updateuserbyid", updateUserById)
    // router.post("/deleteuserbyid", deleteUserById)

module.exports = router