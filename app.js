const express = require('express')
const app = express()
const db = require('./config/db');
var cors = require('cors')
const multer = require('multer')
const bodyParser = require('body-parser');
const path = require('path');

const allRoutes = require('./routes');

const PORT = process.env.PORT || 3000

db.
then(() => {
  console.log("database terkoneksi")
})
.catch((err) => {
  console.log(err);
})

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if(
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ){
    cb(null, true);
  }else {
    cb(null, false)
  }
}

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(multer({storage: fileStorage, fileFilter}).single('image'))
app.use(allRoutes)

app.listen(PORT, () => {
    console.log("server running on port " + PORT)
})