const mongoose = require("mongoose");

class Database {
  static connect() {
    const url = process.env.MONGO_URL;
    mongoose.connect(url);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    return db;
  }
}

module.exports = Database;
