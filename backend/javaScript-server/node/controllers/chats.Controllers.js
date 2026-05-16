const asyncHandler = require("../middleware/AsyncHandler");
const Chats = require("../models/chats");
const { CustomError } = require("../errors/CustomError");

const getChats = asyncHandler(async (req, res) => {
    const chats = await Chats.find({
        participants: req.user.id
    });

    res.status(200).json({
        status: "success",
        chats,
    });
});

const getChat = asyncHandler(async (req, res, next) => {
    const { participants } = req.query;
    const participantsArray = participants.split(",");

    const chat = await Chats.findOne({
        participants: { $all: participantsArray }
    });

    if (!chat) {
        return next(new CustomError("Chat not found", 404));
    }

    res.status(200).json({
        status: "success",
        chat,
    });
});

const createChat = asyncHandler(async (req, res, next) => {
    const { participants } = req.body;
    const participantsArray = participants.split(",");

    if (!participants || participants.length < 2) {
        return next(new CustomError("Participants required", 400));
    }

    const chat = await Chats.create({ participants: { $all: participantsArray } });

    res.status(201).json({
        status: "success",
        chat,
    });
});

const deleteChat = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const deletedChat = await Chats.findByIdAndDelete(id);

    if (!deletedChat) {
        return next(new CustomError("Chat not found", 404));
    }

    res.status(200).json({
        status: "success",
        deletedChat,
    });
});

module.exports = {
    getChats,
    getChat,
    createChat,
    deleteChat,
};