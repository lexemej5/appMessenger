const express = require("express")
const {sendMessage, getMessageById, signUp} = require("../controllers/controller")

const router = express.Router()

router.post("/user/signup", signUp)
router.post("/message", sendMessage)
router.get("/getMessage/:user", getMessageById)

module.exports = router;