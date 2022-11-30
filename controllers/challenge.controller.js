const Challenge = require('../models/challenge');
const mongoose = require('mongoose');
// get:
const getAllChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.find({}, '-__v').populate('categories');

    res.status(200).json({
      message: 'Success get all challenges',
      data: challenge,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server Error',
      error: error.message,
    });
  }
};

// get:id
const getChallengeByID = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'No data for this challenge' });
    const challenge = await Challenge.findOne({ _id: id }).populate('categories');
    res.status(200).json({
      message: `Get challenge with id ${id} success`,
      data: challenge,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server Error',
      error: error.message,
    });
  }
};

// post
const createChallenge = async (req, res) => {
  try {
      
    req.body.image = req.file.path
    const challenge = new Challenge(req.body);

    const createChallenge = await challenge.save();
    res.status(201).send(createChallenge);
} catch (e) {
    res.status(400).send(e);
}
};

// delete:id
const deleteChallengeByID = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'No data for this challenge' });

    await Challenge.deleteOne({ _id: id });
    res.status(200).send({ message: 'Success delete challenge' });
  } catch (error) {
    res.status(404);
    res.send({ error: "Challenge doesn't exist!", message: error.message });
  }
};

// update:id
const updateChallengeByID = async (req, res) => {
  const { id } = req.params;
  const { title, description, requirement, content, categories, status } = req.body;
  try {
    const challenge = await Challenge.findOne({ _id: id });

    if (title) challenge.title = title;

    if (description) challenge.description = description;

    if (requirement) challenge.requirement = requirement;

    if (content) {
      for (let items in content.image) {
        if (content.image[items]) challenge.content.image[items] = content.image[items];
      }

      if (content.video) challenge.content.video = content.video;
    }

    for (let items in categories) {
      if (!challenge.categories.includes(categories[items])) challenge.categories.push(categories[items]);
    }

    if (status != undefined && typeof status == 'boolean') status ? (challenge.status = true) : (challenge.status = false);

    await challenge.save();

    res.json({
      message: 'Success update challenge',
      data: challenge,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getAllChallenge,
  getChallengeByID,
  createChallenge,
  deleteChallengeByID,
  updateChallengeByID,
};
