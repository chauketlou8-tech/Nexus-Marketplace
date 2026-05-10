const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    senderId: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    readStatus: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const messageModel = mongoose.model('Message', messageSchema);

module.exports = messageModel;