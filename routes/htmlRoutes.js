// routes/htmlRoutes.js

var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var fs = require("fs");

//----------------------------------------------------------------------
function writeLog (strg) {
    fs.writeFile("log.txt", strg, function(err) {
        if (err) {
          return console.log("Error writing log file:", err);
        }
        console.log("Lof file updated!");
    });
};
//----------------------------------------------------------------------

module.exports = function(app) {
  
  app.get("/", function(req, res) {
      res.render("index");
  });

  //-----------------------------------------
  app.get("/scrape", function(req, res) {
    axios.get("https://www.reforma.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        let result = {};

		$("a").each(function (i, element) {
            if ( ($(this).text().trim().length > 1) &&
                 ($(this).text().substring(0,1) !== "\n") ){
                if ( result === null ){
                    result.title = $(this).text();
                    result.link  = $(this).attr("href");
                } else {
                    if ( result.link  === $(this).attr("href") ){
                        result.summary = $(this).text();
                        db.Article.create(result)
                        .then(function (dbArticle2) {
                            console.log(dbArticle2);
                        })
                        .catch(function (err2) {
                            console.log(err2);
                        });
                        result = {};
                    } else {
                        result.title = $(this).text();
                        result.link  = $(this).attr("href");
                    };
                };
            };
        });

        res.render("index");
    });
  });

  //-----------------------------------------
  app.get("/sarticles", function(req, res) {
    res.render("sarticles");
  });

  //-----------------------------------------
  app.get("/clear", function(req, res) {
      db.Article.remove({}, function(err){
          if (err) {
              console.log(err);
          } else {
              res.render("index");
          };
      });
  });

  //-----------------------------------------
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
