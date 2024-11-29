require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`Successfully connected to DB: ${conn.connection.host}`)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
};

module.exports = { connectDB }
