/**
 *  Define a collection schema.
 *  References:
 *  https://www.youtube.com/watch?v=adMD46G5BXU
 *  https://github.com/the-debug-arena/login-registration-server-node/blob/main/userDetails.js
 */

const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, minLength: 3, unique: true},
        password: {type: String, required: true, minLength: 6}
    },
    {
        // Define the collection name stored in MongoDB Compass
        collection: "users",
    }
);

mongoose.model("UserInfo", UserDetailsSchema);