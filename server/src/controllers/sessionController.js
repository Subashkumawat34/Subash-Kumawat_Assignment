const GameSession = require('../models/GameSession');

// @desc    Create a new game session
// @route   POST /api/sessions
const createSession = async (req, res, next) => {
    try {
        const { sessionId } = req.body;
        
        if (!sessionId) {
            res.status(400);
            throw new Error('Please provide a session ID');
        }

        const session = await GameSession.create({ sessionId });
        res.status(201).json(session);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a game session
// @route   PUT /api/sessions/:id
const updateSession = async (req, res, next) => {
    try {
        const { status, currentScore } = req.body;
        const session = await GameSession.findOne({ sessionId: req.params.id });

        if (!session) {
            res.status(404);
            throw new Error('Session not found');
        }

        session.status = status || session.status;
        session.currentScore = currentScore !== undefined ? currentScore : session.currentScore;
        
        if (status === 'completed' || status === 'abandoned') {
            session.endTime = Date.now();
        }

        const updatedSession = await session.save();
        res.status(200).json(updatedSession);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSession,
    updateSession
};
