const express = require('express');
const router = express.Router();
const { getLeaderboard, createScore } = require('../controllers/scoreController');

router.route('/leaderboard').get(getLeaderboard);
router.route('/').post(createScore);

module.exports = router;
