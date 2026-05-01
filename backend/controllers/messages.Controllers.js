const asyncHandler = require("../middleware/AsyncHandler");
const Messages = require("../models/messages");
const Chats = require("../models/Chats");
const { CustomError } = require("../errors/CustomError");

// create message
const createMessage = asyncHandler(async (req, res, next) => {
    const { chatId, receiverId, message } = req.body;
    const senderId = req.user.id

    if (!chatId || !senderId || !receiverId || !message) {
        return next(new CustomError("Missing fields", 400));
    }

    const newMessage = await Messages.create({
        chatId,
        senderId,
        receiverId,
        message,
    });

    // update chat last message
    await Chats.findByIdAndUpdate(chatId, {
        lastMessage: message,
    });

    res.status(201).json({
        success: true,
        data: newMessage,
    });
});

// delete message
const deleteMessage = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const deletedMessage = await Messages.findByIdAndDelete(id);

    if (!deletedMessage) {
        return next(new CustomError("Message not found", 404));
    }

    // update chat last message (get latest message)
    const lastMsg = await Messages.findOne({
        chatId: deletedMessage.chatId,
    }).sort({ createdAt: -1 });

    await Chats.findByIdAndUpdate(deletedMessage.chatId, {
        lastMessage: lastMsg ? lastMsg.message : "",
    });

    res.status(200).json({
        success: true,
        deletedMessage,
    });
});

// update message
const updateMessage = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
        return next(new CustomError("Message required", 400));
    }

    const updatedMessage = await Messages.findByIdAndUpdate(
        id,
        { message },
        { new: true }
    );

    if (!updatedMessage) {
        return next(new CustomError("Message not found", 404));
    }

    // update chat last message if this was the latest message
    const lastMsg = await Messages.findOne({
        chatId: updatedMessage.chatId,
    }).sort({ createdAt: -1 });

    await Chats.findByIdAndUpdate(updatedMessage.chatId, {
        lastMessage: lastMsg ? lastMsg.message : "",
    });

    res.status(200).json({
        success: true,
        updatedMessage,
    });
});

module.exports = {
    createMessage,
    deleteMessage,
    updateMessage,
};