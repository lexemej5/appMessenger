require("dotenv").config()
const mongoose = require("mongoose")

const connectDb = ()=>{
mongoose.connect(process.env.DATABASE_URL).then(()=>{
console.log("DataBase Connected!")}).catch((e)=>{
console.log(e)
process.exit(1)
})
}


module.exports = connectDb;