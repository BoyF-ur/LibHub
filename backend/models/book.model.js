const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const book = new Schema({
    title: { type:String, required: true},
    category: { type: String, required: true },
    story: { type:String, required: true},
    isFavourite: { type: Boolean, default: false},
    imageUrl: {type: String, required: true},
    date: Date,
    remainingBook: {type: Number, required: true},
});



module.exports = mongoose.model("Book", book);