const mongoose = require('mongoose');

const { conectionStr, dataBase } = require('./constants');

async function dbConnect() {
    // console.log(process.env.PORT);
    await mongoose.connect(`${conectionStr}`);
}

module.exports = dbConnect;