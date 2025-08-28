const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { createStudent } = require("../api/student/studentController")
const { verifyOtp, sendOtp, createUser, loginUser, getAllUser, getUserById, updateUserById, deleteUserById } = require("../api/user/userControlller")
const { createPost } = require("../api/post/postController")
const { getAllPost } = require("../api/post/postController")
const upload = require("../middleware/multer")


router.post("/verifyotp", verifyOtp)
router.post("/sendotp", sendOtp)
router.post("/createuser", upload.fields([{ name: "image", maxCount: 2 }, { name: "pancard", maxCount: 2 }, { name: "addharcard", maxCount: 2 }]), createUser)
router.post("/createstudent", createStudent)


router.post("/loginuser", loginUser)
router.get("/getalluser", getAllUser)
router.post("/getuserbyid", getUserById)
router.post("/createpost", createPost)
router.post("/getallpost", getAllPost)
router.post("/updateuserbyid", updateUserById)
router.post("/deleteuserbyid", deleteUserById)

module.exports = router