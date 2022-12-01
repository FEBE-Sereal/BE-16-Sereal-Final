const mongoose = require('mongoose');
const { Schema } = mongoose;

const advertisingSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  image: {
    type: String,
    required: true,
    minLength: 10,
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
  },
  categories: {
    type: mongoose.ObjectId,
    ref: 'Categories',
    required: true,
  }
  ,
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Advertising = mongoose.model('Advertising', advertisingSchema);

module.exports = Advertising;
