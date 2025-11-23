const {userModel, msgModel} = require("../model/model")

const signUp = async(req, res)=>{
const {username} = req.body;
if(!username){
res.json({
successful: false,
message: "Enter a username, please!"
})
return;
}

const user = await userModel.findOne({username : username})
if(user){
res.json({
successful: false,
message: "Username Already Existed!"
})
return;
}

const newUser = await userModel.create({
username
})

const inbox = new msgModel({
userId : newUser.toJSON().id
})
await inbox.save()

return res.json({
successful : true,
message : `${newUser.username} is successfully registered!`,
userId :  newUser._id
})

}

const sendMessage = async(req, res)=>{
const {message, to} = req.body
const {_id} = await userModel.findOne({username: to})
if(!message){
res.json({
successful: false,
message: "Type some message, please!"
})
return;
}

if(!_id){
throw new Error("Error occured")
}


const foundUser = await msgModel.findOneAndUpdate({userId: _id},
{$push:{messages: message}}, {new: true})

if(!foundUser){
return res.json({
successful : false,
message: "Incorrect link to the sender!"
})
}
return res.json({
successful : true,
message: "Message sent successfully!"
})
}

const getMessageById = async(req, res)=>{
const {user} = req.params
const {_id} = await userModel.findOne({username: user})
const userMessage = await msgModel.findOne({userId: _id})
if(!userMessage){
res.json({
successful: false,
message: "No messages with this userId found"
})
}
const {messages} = userMessage;

return res.json({
successful: true,
message: messages
})
}


module.exports ={ 
signUp,
sendMessage,
getMessageById
}