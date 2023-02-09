/**
 * References:
 * JWT generator:
 * https://jwt.io/
 * */

var express = require('express');
var router = express.Router();
require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const notifier = require("node-notifier");
const jwt = require("jsonwebtoken");
const User = mongoose.model("UserInfo");
// Expiration time: Thu June 01 2023 00:00:00 GMT+2 (Central European Summer Time)
const JWT_SECRET =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWVtZSBnZW5lcmF0b3IiLCJpYXQiOjE2ODU1NzA0MDB9.fkz2BwlltKHTWAg-QfO_UdB0fTBvT1f0Z3gbL_zJ2fE";

/* GET users listing. */
router.get('/', function (req, res, next) {
    const db = req.db;
    const users = db.get('users');
    users.find({username: req.username}, {projection: {basicauthtoken: 0}}) // return all user properties, except the basic auth token
        .then((docs) => res.json(docs))
        .catch((e) => res.status(500).send())
});

// register part
router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const oldUser = await User.findOne({username});

        if (oldUser) {
            notifier.notify("User already exists, please change a name!");
            return res.json({error: "User already exists."});
        }

        await User.create({
            username,
            password: encryptedPassword,
        });
        res.send({status: "ok"});
    } catch (error) {
        res.send({status: "error"});
    }
});

// login part
router.post("/login-user", async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if (!user) {
        return res.json({error: "User not found."});
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({username: user.username}, JWT_SECRET);

        if (res.status(201)) {
            return res.json({status: "ok", data: token});
        } else {
            return res.json({error: "error"});
        }
    }

    res.json({status: "error", error: "Invalid password."});
});

// get user data after login part
router.post("/userData", async (req, res) => {
    const {token} = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        });
        console.log(user);
        if (user == "token expired") {
            return res.send({status: "error", data: "token expired"});
        }

        const username = user.username;
        User.findOne({username: username})
            .then((data) => {
                res.send({status: "ok", data: data});
            })
            .catch((error) => {
                res.send({status: "error", data: error});
            });
    } catch (error) {
    }
});

module.exports = router;
