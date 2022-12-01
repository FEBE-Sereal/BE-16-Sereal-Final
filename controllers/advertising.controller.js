const Advertising = require('../models/advertising');
const mongoose = require('mongoose');

// get:
const getAllAdvertising = async (req, res) => {
  try {
    if (JSON.stringify(req.query) !== '{}') {
      const value = Object.values(req.query)[0];
      const advertising = await Advertising.find({ categories: value }, '-__v').populate('categories');
      res.status(200).json({
        message: 'Success get advertising by categories',
        data: advertising
      });
    } else {
      const advertising = await Advertising.find({}, '-__v').populate('categories');
      res.status(200).json({
        message: 'Success get all advertising',
        data: advertising
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server Error',
      error: error.message,
    });
  }
};

// get:id
const getAdvertisingByID = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'No data for this advertising' });
    const advertising = await Advertising.findOne({ _id: id }).populate('categories', '-__v');

    res.status(200).json({
      message: `Get advertising with id ${id} success`,
      data: advertising,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server Error',
      error: error.message,
    });
  }
};

// post
const createAdvertising = (req, res) => {
  const data = req.body;

  const advertising = new Advertising(data);
  advertising.save(function (err) {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(201).json({
        message: 'Advertising has been created',
      });
    }
  });
};

// delete:id
const deleteAdvertisingByID = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'No data for this advertising' });

    await Advertising.deleteOne({ _id: id });
    res.status(200).send({ message: 'Success delete advertising' });
  } catch (error) {
    res.status(404);
    res.send({ error: "Advertising doesn't exist!", message: error.message });
  }
};

// update:id
const updateAdvertisingByID = async (req, res) => {
  const { id } = req.params;

  const { title, image, description, categories, status } = req.body;

  try {
    const advertising = await Advertising.findOne({ _id: id });

    if (title) advertising.title = title;

    if (image) advertising.image = image;

    if (description) advertising.description = description;

    if (categories) advertising.categories = categories;

    if (status != undefined && typeof status == 'boolean') status ? (advertising.status = true) : (advertising.status = false);

    await advertising.save();

    res.json({
      message: 'Success update advertising',
      data: advertising,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllAdvertising,
  getAdvertisingByID,
  createAdvertising,
  deleteAdvertisingByID,
  updateAdvertisingByID,
};
