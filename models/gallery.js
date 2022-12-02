const mongoose = require('mongoose');
const { Schema } = mongoose;

const gallerySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    // maxLength: 1000,
  },
  image: {
    type: String,
    required: true,
  }, 
  categories: [
    {
      type: mongoose.ObjectId,
      ref: 'Categories',
      required: true,
    },
  ],
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
