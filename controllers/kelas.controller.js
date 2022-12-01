const Kelas = require('../models/kelas');
const mongoose = require('mongoose');
// get:
const getAllKelas = async (req, res) => {
  try {
    if (JSON.stringify(req.query) !== '{}') {
      const value = Object.values(req.query)[0];
      const kelas = await Kelas.find({ categories: value }, '-__v').populate('materi categories');
      res.status(200).json({
        message: 'Success get kelas by categories',
        data: kelas
      });
    } else {
      const kelas = await Kelas.find({}, '-__v').populate('materi categories');
      res.status(200).json({
        message: 'Success get all kelas',
        data: kelas});
    }
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: error.message,
    });
  }
};

// get:id
const getKelasByID = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'No data for this kelas' });
    const kelas = await Kelas.findOne({ _id: id }).populate('materi categories', '-__v');

    res.status(200).json({
      message: `Get kelas with id ${id} success`,
      data: kelas,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server Error',
      error: error.message,
    });
  }
};

// post
const createKelas = (req, res) => {
  const data = req.body;

  const kelas = new Kelas(data);
  kelas.save(function (err) {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(201).json({
        message: 'Kelas has been created',
      });
    }
  });
};

// delete:id
const deleteKelasByID = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'No data for this kelas' });

    await Kelas.deleteOne({ _id: id });
    res.status(200).send({ message: 'Success delete kelas' });
  } catch (error) {
    res.status(404);
    res.send({ error: "Kelas doesn't exist!", message: error.message });
  }
};

// update:id
const updateKelasByID = async (req, res) => {
  const { id } = req.params;

  const { title, image, description, materi, categories, status, level } = req.body;

  try {
    const kelas = await Kelas.findOne({ _id: id });

    if (title) kelas.title = title;

    if (image) kelas.image = image;

    if (description) kelas.description = description;

    for (let items in materi) {
      if (!kelas.materi.includes(materi[items])) kelas.materi.push(materi[items]);
    }

    for (let items in categories) {
      if (!kelas.categories.includes(categories[items])) kelas.categories.push(categories[items]);
    }

    if (level) kelas.level = level;

    if (status != undefined && typeof status == 'boolean') status ? (kelas.status = true) : (kelas.status = false);

    await kelas.save();

    res.json({
      message: 'Success update kelas',
      data: kelas,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllKelas,
  getKelasByID,
  createKelas,
  deleteKelasByID,
  updateKelasByID,
};
