const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const UserModel = require("./model/Users")

const app = express()

// port
const port = process.env.PORT || 3002

// DB config
mongoose.connect("mongodb://127.0.0.1:27017/crud-img")
.then(() => console.log("DB is connected"))

// middleware
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

// Multer diskStorage for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb ) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// Api routes
app.post("/upload", upload.single("file"), (req,res) => {
    UserModel.create({ image: req.file.filename })
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get("/getImage", (req,res) => {
    UserModel.find()
    .then(photos => res.json(photos))
    .catch(err => res.json(err))
})

// Listener
app.listen(port, () => {
    console.log("Server is running")
})