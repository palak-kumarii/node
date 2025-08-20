const express = require("express")
const router = express.Router()
const { createUser } = require("../api/user/userControlller")



router.post("/createuser", createUser)

module.exports = router