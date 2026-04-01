const express = require('express');
const router = express.Router();
const { createSession, updateSession } = require('../controllers/sessionController');

router.route('/').post(createSession);
router.route('/:id').put(updateSession);

module.exports = router;
