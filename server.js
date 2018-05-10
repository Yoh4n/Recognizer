const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Initialize Api Routes
const users = require("./routes/api/users");
const distributors = require("./routes/api/distributors");

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => consoel.log(err));

// Use Routes
app.use("/api/users", users);
app.use("/api/distributors", distributors);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));