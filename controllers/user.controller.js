const bcrypt = require('bcrypt');
const User = require("../models/user")
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

  register: (req, res) => {
    const data = req.body

    const saltRounds = 10
    const hash = bcrypt.hashSync(data.password, saltRounds);
    data.password = hash
    const user = new User(data)
   
    user.save()

    res.json({
      message: "data has been created!!",
    })
  },
  // post: /login
  login: async (req, res) => {
    const data = req.body;
    const user = await User.findOne({ email: data.email });

    if (!user){
      return res.status(404).json({
        message: "Invalid username/password"
      })
    }
    const checkPwd = bcrypt.compareSync(data.password, user.password);
    
    if (checkPwd) {
      const token = jwt.sign({ user }, process.env.TOKEN_KEY, {expiresIn: 86400 }); //expires in 24 hours
      res.header("x-access-token", token).status(200).json({
        message: "Anda berhasil login",
        token,
      });
    } else {
      res.status(400).json({
        message: "Login gagal",
      });
    }
  },
  
  // get:/
  getAllUser: async (req, res) => {
    try {
      const user = await User.find({}, '-__v')
      res.json({
        message: "get all user success",
        data: user,
      });
    } catch (error) {
      res.status(500).send({
        message: "server error",
        error: error.message,
      });
    }
  },

  // get: /:id
  getUserByID: async (req, res) => {
    const {id} = req.params;
    try {
      const user = await User.findById(id)
      res.status(200).json({
        message: "get a user succes",
        data: user
      })
    } catch (error) {
      res.status(404).send({
        message: "user doesn't exist",
        error: error.message,
      })
    }
  },

  // update: /:id
  updateUserByID: async (req, res) => {
    const id = req.params;
    try {
      const data = req.body;
      // if (data.)
      const user = await User.findByIdAndUpdate(id, data)
      console.table(user);
    } catch (error) {
      res.status(500).send({
        message: 'server error',
        error: error.message,
      });
    }
  },
  
  // type 2 update: /:id
  updateUserByID2: async (req, res) => {
    const id = req.params;
    try {
      const data = req.body;
      // if (data.)
      const user = await User.findById(id)
      console.table(user);
      if (data.name){
        user.name = data.name;
      }
      if (data.email){
        user.email = data.email;
      }
      if (data.password){
        user.password = data.password;
      }
      if (data.role){
        user.role = data.role;
      }
      if (data.sekolah){
        user.sekolah = data.sekolah;
      }
      if (data.tgl_lahir){
        user.tgl_lahir = data.tgl_lahir;
      }
      if (data.jns.kelamin){
        user.jns.kelamin = data.jns.kelamin;
      }
      for (let item in data.kelas.complete){
        if (data.kelas.complete[item])
        user.kelas.complete[item] = data.kelas.complete[item];
      }
      for (let item in data.kelas.progress){
        if (data.kelas.progress[item])
        user.kelas.progress[item] = data.kelas.progress[item];
      }
      for (let item in data.challenge.complete){
        if (data.challenge.complete[item])
        user.challenge.complete[item] = data.challenge.complete[item];
      }
      for (let item in data.challenge.progress){
        if (data.challenge.progress[item])
        user.challenge.progress[item] = data.challenge.progress[item];
      }
      if (data.social_media.insta){
        user.social_media.insta = data.social_media.insta;
      }
      if (data.social_media.fb){
        user.social_media.fb = data.social_media.fb;
      }
      if (data.social_media.other){
        user.social_media.other = data.social_media.other;
      }
      await user.save();
      res.status(200).json({
        massage: 'success',
        data: user,
      });
    } catch (error) {
      res.status(500).send({
        message: 'server error',
        error: error.message,
      });
    }
  },

// _id
// name
// email
// password
// role
// sekolah
// tgl_lahir
// jns_kelamin
// kelas: complete: [] , progress: [] 
// challenge: complete: [] , progress: [] 
// social_media: insta: ,fb: , other: 

  // delete: /:id
  deleteUserByID: async (req, res) => {
    const {id} = req.params;
    try {
      const user = await User.findByIdAndDelete(id)
      res.status(200).json({
        message: `user id ${id} succesfully deleted`
      });
    } catch (error) {
      res.status(404).send({
        message: "user doesn't exist",
        error: error.message,
      })
    }
  },
};