const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    foodImage: {
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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admins",
    },
    

}
);


// create model
const Food = mongoose.model("food", foodSchema);

module.exports = {Food};