const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        filename: {
            type: String,
            default: ''
        },
        contentType: {
            type: String,
            default: ''
        },
        imageBase64: {
            type: String,
            default: ''
        }
    },
    wishlistItem: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "foods",
        }
    ],
    cartItem: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "foods",
        }
    ]
},
{
    timestamps: true 
}
);


// create model
const User = mongoose.model("user", userSchema);


module.exports = {User};