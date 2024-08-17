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
    createdItem: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "foods",
        }
    ],
},

{
    timestamps: true 
}
);


// create model
const Admin = mongoose.model("admin", userSchema);


module.exports = {Admin};