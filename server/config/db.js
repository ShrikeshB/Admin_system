const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connection to mongoDB successful!");
  } catch (err) {
    // handle expection and if any then end process
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
