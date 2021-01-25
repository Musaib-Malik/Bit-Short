// Import Modules
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to database
mongoose.connect(
  process.env.DB,
  {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("Connected with DB")
);

// Export Mongoose
module.exports = mongoose;
