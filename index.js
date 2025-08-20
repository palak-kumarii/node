const express = require("express")
const app = express()
require("dotenv").config()
const db = require("./server/config/db")
const route = require("./server/routes/route")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", route)


db()



const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is running at port number  http://localhost:${port}`)
})