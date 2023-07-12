const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    image: String
})

const UserModel = mongoose.model("photos", imageSchema)

module.exports = UserModel