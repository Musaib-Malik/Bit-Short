// Import NPM Modules
const express = require("express");

// Import Local Modules
const Url = require("./db/models/url");
require("./db/mongoose");

// Instantiate Express Server
const app = express();

// EJS
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Render Home Page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  try {
    // Check If Short Url Already Exists
    const isMatch = await Url.findOne({ fullUrl: req.body.fullUrl });

    // If Match
    if (isMatch) {
      return res.render("index", {
        url: isMatch,
        host: req.headers.host,
      });
    }

    // If Not Match - Create Short Url
    const url = new Url({ fullUrl: req.body.fullUrl });
    await url.save();
    res.render("index", {
      url,
      host: req.headers.host,
    });
  } catch (e) {
    res.sendStatus(500);
  }
});

// Get Full Url From Short Url
app.get("/:shortUrl", async (req, res) => {
  try {
    // Check If Url Exists
    const doesExist = await Url.findOne({ shortUrl: req.params.shortUrl });

    // If not exists
    if (!doesExist) {
      return res.send("Invalid Short-Url");
    }

    // If Exists
    res.redirect(doesExist.fullUrl);
  } catch (e) {
    res.sendStatus(500);
  }
});

// Start Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Running on Port: ${PORT}`));
