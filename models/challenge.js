const mongoose = require('mongoose');
const { Schema } = mongoose;

const challengeSchema = new Schema({
  title: {
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
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
