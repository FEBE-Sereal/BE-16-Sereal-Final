const mongoose = require('mongoose');
const { Schema } = mongoose;

const kelasSchema = new Schema({
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
  materi: [
    {
      type: mongoose.ObjectId,
      ref: 'Materi',
      required: true,
    },
  ],
  categories: [
    {
      type: mongoose.ObjectId,
      ref: 'Categories',
      required: true,
    },
  ],
  level: {
    type: String,
    required: true,
    enum: ['Pemula', 'Menegah', 'Mahir'],
    default: 'Pemula',
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Kelas = mongoose.model('Kelas', kelasSchema);

module.exports = Kelas;
