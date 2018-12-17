const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: { type: String, required: true },
    githubId: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: {},
  }
);

module.exports = User;
