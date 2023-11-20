const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");

// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

// Connect to database
connectDB();

// Using EJS for views
app.set("view engine", "ejs");

// Static folder
app.use(express.static("public"));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Insert new route here for comments

// Logging
app.use(logger("dev"));

// Use forms for PUT / DELETE
app.use(methodOverride("_method"));

// Setup sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use flash messages for errors, info, etc.
app.use(flash());

// Setup routes for which the server is listening
app.use("/", mainRoutes);

// Server running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});