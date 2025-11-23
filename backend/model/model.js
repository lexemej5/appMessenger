const mongoose = require("mongoose")
const Schema  = mongoose.Schema

const User = new Schema({
username:{
type: String,
required: true,
unique: true
}
}, {timestamps : true})

const Message = new Schema({
userId:{
type: String,
required: true,
unique: true
},
messages:{
type: [String],
required: true,
default: []
}
}, {timestamps : true})

User.methods.toJSON = function(){
const obj = this.toObject();
obj.id = obj._id
delete obj._id
delete obj.__v;
return obj;
}

const userModel = mongoose.model("USER", User)
const msgModel = mongoose.model("MESSAGE", Message)

module.exports = {
userModel,
msgModel
}