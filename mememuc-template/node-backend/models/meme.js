const mongoose = require('mongoose');

/**
 * Properties
 * title: title of meme
 * url: link for single view of meme
 * img: link to image saved on the database
 * date: generated time of meme
 * author: author of meme
 * permission: permission of meme
 * */
const MemeSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        url: {type: String, required: true},
        img: {type: String, required: true},
        date: {type: String, required: true},
        author: {type: String, required: true},
        permission: {type: String, required: true},
    },
    {
        // Define the collection name stored in MongoDB Compass
        collection: "memes",
    }
);

module.exports = mongoose.model("MemeInfo", MemeSchema);