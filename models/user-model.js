const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("dotenv").config();

const userSchema = new Schema(
    {
        phone: { type: String, required: true },
        name: { type: String, required: false },
        avatar: {
            type: String,
            required: false,
            get: (avatar) => {
                if (avatar) {
                    return `https://univoicedb.herokuapp.com/storage/1660115420318-829142435.png`;
                }
                return `https://univoicedb.herokuapp.com/storage/1660115420318-829142435.png`;
            },
        },
        activated: { type: Boolean, required: false, default: false },
    },
    {
        timestamps: true,
        toJSON: { getters: true },
    }
);

module.exports = mongoose.model('User', userSchema, 'users');
