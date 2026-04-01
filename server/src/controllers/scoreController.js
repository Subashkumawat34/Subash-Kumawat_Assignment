const Score = require('../models/Score');

// @desc    Get top 10 scores (leaderboard)
// @route   GET /api/scores/leaderboard
const getLeaderboard = async (req, res, next) => {
    try {
        const scores = await Score.find()
            .sort({ score: -1 })
            .limit(10);
        res.status(200).json(scores);
    } catch (error) {
        next(error);
    }
};

// @desc    Create new score
// @route   POST /api/scores
const createScore = async (req, res, next) => {
    try {
        const { playerName, score, timeElapsed, clicks } = req.body;

        if (!playerName || score === undefined || score === null) {
            res.status(400);
            throw new Error('Please include player name and score');
        }

        const newScore = await Score.create({
            playerName,
            score,
            timeElapsed,
            clicks
        });

        res.status(201).json(newScore);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getLeaderboard,
    createScore
};
