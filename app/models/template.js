const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Template = new Schema(
  {
    name: { type: String, required: true, max: 100 },
    code: { type: String, required: true },
    base: { type: Boolean, default: false },
    favorited_by: { type: Number, default: 0 },
    used_by: { type: Number, default: 0 },
    description: String,
  },
  {
    timestamps: {},
  }
);

module.exports = mongoose.model("Template", Template);
