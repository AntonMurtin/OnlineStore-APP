const mongoose = require('mongoose');
// require('dotenv').config();

const { conectionStr, dataBase } = require('./constants');

async function dbConnect() {
    console.log(conn.connection.host)
    // await mongoose.connect(`${conectionStr}`);
}

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

module.exports = connectDB;