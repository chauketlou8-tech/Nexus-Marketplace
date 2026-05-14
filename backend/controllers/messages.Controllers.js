const asyncHandler = require("../middleware/AsyncHandler");
const Messages = require("../models/messages");
const Chats = require("../models/Chats");
const { CustomError } = require("../errors/CustomError");

// create message
const createMessage = asyncHandler(async (req, res, next) => {
    const { chatId, message } = req.body;
    const senderId = req.user.id
    console.log(senderId, chatId, message);

    if (!chatId || !senderId || !message) {
        return next(new CustomError("Missing fields", 400));
    }

    //creates a new message
    const newMessage = await Messages.create({
        chatId,
        senderId,
        message,
    });

    // update chat last message
    await Chats.findByIdAndUpdate(chatId, {
        lastMessage: message,
    });

    return res.status(201).json({
        success: true,
        message: newMessage,
    });
});

// delete message
const deleteMessage = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { chatId } = req.query;

    const deletedMessage = await Messages.findByIdAndUpdate(id, {
        message: "message deleted",
    }, {new: true});

    if (!deletedMessage) {
        return next(new CustomError("Message not found", 404));
    }

    await Chats.findByIdAndUpdate({_id: chatId}, {
        lastMessage: "message deleted"
    }, {new: true});

    return res.status(200).json({
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

    const updatedMessage = await Messages.findByIdAndUpdate(id, { message }, { new: true });

    if (!updatedMessage) {
        return next(new CustomError("Message not found", 404));
    }

    // update chat last message if this was the latest message
    const lastMsg = await Messages.findOne({
        chatId: updatedMessage.chatId,
    }).sort({ createdAt: -1 });

    await Chats.findByIdAndUpdate(updatedMessage.chatId, {lastMessage: lastMsg ? lastMsg.message : "",}, {new: true});

    return res.status(200).json({
        success: true,
        updatedMessage,
    });
});

const getMessage = asyncHandler(async (req, res, next) => {
    const { chatId, message } = req.query;

    if (!message || !chatId) {
        return next(new CustomError("Please provide all the required information", 400));
    }

    const msg = await Messages.findOne({
        chatId,
        message,
    });

    if (!msg) {
        return next(new CustomError("No message found", 404));
    }

    return res.status(200).json({
        success: true,
        msg,
    });
});

const getMessages = asyncHandler(async (req, res, next) => {
    const { chatId } = req.query;
    console.log(chatId);

    if (!chatId) {
        return next(new CustomError("No chatId provided", 400));
    }

    const messages = await Messages.find({ chatId });

    return res.status(200).json({
        success: true,
        messages,
    });
});

const readMessage = asyncHandler(async (req, res, next) => {
    const { chatId, message } = req.body;

    if (!chatId || !message) {
        return next(new CustomError("Please provide all the details", 400));
    }

    await Messages.findOneAndUpdate({ chatId, message }, { readStatus: true }, {new: true});

    return res.status(200).json({
        success: true,
        message,
    });
});

module.exports = {
    createMessage,
    deleteMessage,
    updateMessage,
    getMessage,
    getMessages,
    readMessage,
};