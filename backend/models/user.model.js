<<<<<<< Updated upstream
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: String,
  email: String,
  password: String,

});

module.exports = mongoose.model("User", UserSchema);
=======
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName : String,
    email: String,
    password: String,
    avatar:String,
    MSSV:String,
    Birth:Date,
});

module.exports = mongoose.model("User", UserSchema);  
>>>>>>> Stashed changes
