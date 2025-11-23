require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDb = require("./config/db")
const router = require("./routes/route")

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())

connectDb();

app.use("/api", router)

app.listen(PORT, ()=>{
console.log(`server is running on port ${PORT}`)
})



