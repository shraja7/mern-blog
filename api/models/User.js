//user model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, min: 4 },
  password: { type: String, required: true },
});
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
