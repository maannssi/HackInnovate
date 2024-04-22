require('dotenv').config();
const mongoose = require("mongoose");
const mongoURI = ""

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to mongoDB")

    } catch (error) {
        console.log("Error connecting to mongoDB", error)
    }

}

module.exports = mongoDB;