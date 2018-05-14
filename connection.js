const mongoose = require("mongoose");

class Database {
  static connect() {
    const url = "mongodb://127.0.0.1/snippets";
    mongoose.connect(url);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    return db;
  }
}

module.exports = Database;
