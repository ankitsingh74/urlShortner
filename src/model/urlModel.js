const mongoose = require("mongoose");
const shortId= require("shortid")

const urlSchema = new mongoose.Schema({
  urlCode: {
    type: String,
    required: [true,"urlCode is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  longUrl: {
    type: String,
    required: [true,"longUrl is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  shortUrl: {
    type: String,
    required: [true,"shortUrl is required"],
    default:shortId.generate(),
    unique: true,
    lowercase: true,
    trim: true,
  },
});

module.exports = mongoose.model("Url", urlSchema)


// { urlCode: { mandatory, unique, lowercase, trim }, longUrl: {mandatory, valid url}, shortUrl: {mandatory, unique} }
