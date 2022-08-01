const mongoose = require("mongoose");

//---------

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("successfully connected to the DB");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
