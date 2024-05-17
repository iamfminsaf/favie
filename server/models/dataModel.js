const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    title: String,
    rate: Number,
    genre: Array,
    like: Number,
});

const dataModel = mongoose.model("Data", dataSchema);

module.exports = dataModel;
