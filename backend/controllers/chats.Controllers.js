const asyncHandler = require("../middleware/AsyncHandler");
const Chats = require("../models/Chats");

const getChats = asyncHandler(async (req, res) => {
    try{
        const chats = await Chats.find({});

        res.status(200).json({
            status: "success",
            chats,
        });
    }
    catch(err){
        return res.status(500).json({
            status: "error",
            error: err.message,
        });
    }
});

const getChat = asyncHandler(async (req, res) => {
    try{
        const id = req.params.id;

        const chat = await Chats.findById(id);

        if (!chat) {
            return res.status(404).json({
                status: "error",
                error: "No such chat",
            });
        }

        res.status(200).json({
            status: "success",
            chat,
        });
    }
    catch(err){
        return res.status(500).json({
            status: "error",
            error: err.message,
        });
    }
});

const createChat = asyncHandler(async (req, res) => {
    const { participants } = req.body;

    if (!participants || !participants.length ) {
        return res.status(400).json({
            status: "error",
            error: "missing information"
        });
    }

    try{
        const chat = await Chats.create({ participants });

        res.status(201).json({
            status: "success",
            message: "Successfully created",
            chat,
        });
    }
    catch(err){
        return res.status(500).json({
            status: "error",
            error: err.message,
        });
    }
});

/*const updateChat = asyncHandler(async (req, res) => {
    const { participants, lastMessage } = req.body;
    if (!participants || !participants.length || !lastMessage) {
        return res.status(400).json({
            status: "error",
            error: "missing information"
        });
    }

    try{
        const updatedChat = await Chats.findByIdAndUpdate(req.params.id, { lastMessage }, { new: true });

        return res.status(200).json({
            status: "successfully updated",
            updatedChat,
        });
    }
    catch(err){
        return res.status(500).json({
            status: "error",
            error: err.message,
        });
    }
});*/

const deleteChat = asyncHandler(async (req, res) => {
    try{
        const id = req.params.id;

        const deletedChat = await Chats.findByIdAndDelete(id);

        return res.status(200).json({
            status: "success",
            message: "Successfully deleted",
            deletedChat,
        });
    }
    catch(err){
        return res.status(500).json({
            status: "error",
            error: err.message,
        });
    }
});

module.exports = {
    getChats,
    getChat,
    createChat,
    deleteChat,
}