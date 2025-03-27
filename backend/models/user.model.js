const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  avatar: {
    type: String,
    default: "http://localhost:8000/assets/placeholder.png",
  },
  MSSV: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

module.exports = mongoose.model("User", UserSchema);
