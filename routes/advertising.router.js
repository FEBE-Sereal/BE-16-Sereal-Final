const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const { getAllAdvertising, getAdvertisingByID, createAdvertising, deleteAdvertisingByID, updateAdvertisingByID } = require('../controllers/advertising.controller');

router.get('/', getAllAdvertising);
router.get('/:id', getAdvertisingByID);
router.post('/', verifyToken, createAdvertising);
router.delete('/:id', authorize, deleteAdvertisingByID);
router.patch('/:id', authorize, updateAdvertisingByID);

module.exports = router;
