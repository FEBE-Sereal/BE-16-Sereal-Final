const express = require('express');
const router = express.Router();

const userRouter = require('./user.router');
const materiRouter = require('./materi.router');
const challengeRouter = require('./challenge.router');
const galleryRouter = require('./gallery.router');
const kelasRouter = require('./kelas.router');
const advertisingRouter = require('./advertising.router');
const categoriesRouter = require('./categories.router');
const authRouter = require('./auth.router');
// const verifyToken = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.use('/', authRouter);
router.use('/materi', materiRouter);
router.use('/challenge', challengeRouter);
router.use('/gallery', galleryRouter);
router.use('/kelas', kelasRouter);
router.use('/advertising', advertisingRouter);
router.use('/users', authorize, userRouter);
router.use('/categories', categoriesRouter);

module.exports = router;
