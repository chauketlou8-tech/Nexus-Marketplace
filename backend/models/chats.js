const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    participants: [
        {
            type: Number,
            ref: 'User',
            required: true
        }
    ],
    lastMessage: {
        type: String,
        default: null
    },
}, { timestamps: true });

const chatModel = mongoose.model('Chat', chatSchema);

module.exports = chatModel;