// Import Modules
const mongoose = require("mongoose");
const shortID = require("shortid");

// Define Url Schema
const urlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: shortID.generate,
  },
});

// Create URL Model
const URL = mongoose.model("Url", urlSchema);

// Export Model
module.exports = URL;
