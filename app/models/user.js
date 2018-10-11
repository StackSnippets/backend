const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true }
});

export default User;
