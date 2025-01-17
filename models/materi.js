const mongoose = require('mongoose');
const { Schema } = mongoose;

const materiSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    // maxLength: 100,
  },
  body: {
    type: String,
    required: true,
    minLength: 10,
    // maxLength: 1000,
  },
  content: {
    image: [
      {
        type: String,
        required: true,
      },
    ],
    video: [
      {
        type: String,
        required: false,
      },
    ],
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Materi = mongoose.model('Materi', materiSchema);

module.exports = Materi;
