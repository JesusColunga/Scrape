// server.js

var express  = require("express");               // Project 2 + Activ. 20
var logger   = require("morgan");                // Activ. 20
var mongoose = require("mongoose");              // Activ. 20
var exphbs   = require("express-handlebars");    // Project 2
var axios    = require("axios");                 // Activ. 20
var cheerio  = require("cheerio");               // Activ. 20
var db       = require("./models");              // Project 2 + Activ. 20
var app      = express();                        // Project 2 + Activ. 20
var PORT     = process.env.PORT || 3000;         // Project 2

// Middleware
app.use(logger("dev"));                          // Activ. 20
app.use(express.urlencoded({ extended: true })); // Activ. 20 (true) / Project 2 (false)
app.use(express.json());                         // Project 2 + Activ. 20
app.use(express.static("public"));               // Project 2 + Activ. 20

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
//if (process.env.NODE_ENV === "test") {
//  syncOptions.force = true;
//}

// Starting the server, syncing our models ------------------------------------/
//db.sequelize.sync(syncOptions).then(function() {

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
//mongoose
//   .connect("mongodb://localhost/scraper", { useNewUrlParser: true })
   .then(function() {
        app.listen(PORT, function() {
            console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
            );
        });
   });

module.exports = app;
