const mongoose = require("mongoose");
const MemeCommentSchema = new mongoose.Schema(
    {
        url: {type: String, required: true},
        from: {type: String, required: true},
        to: {type: String, required: true},
    },
    {
        // Define the collection name stored in MongoDB Compass
        collection: "meme_comments",
    }
);

module.exports = mongoose.model("MemeComment", MemeCommentSchema);