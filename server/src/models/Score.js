const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: [true, 'Please add a player name'],
    },
    score: {
        type: Number,
        required: [true, 'Please add a score'],
    },
    gameId: {
        type: String,
        default: 'grid'
    },
    details: {
        type: Object,
        default: {}
    },
    timeElapsed: {
        type: Number,
    },
    clicks: {
        type: Number,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Score', scoreSchema);
