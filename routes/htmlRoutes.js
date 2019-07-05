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
  // Load index page
  app.get("/", function(req, res) {
      res.render("index");
  });

  app.get("/scrape", function(req, res) {
    axios.get("https://www.reforma.com/").then(function (response) {
        //writeLog(response.data);
        var $ = cheerio.load(response.data);
        //writeLog($);

        // Save an empty result object
        let result = {};

        // Now, we grab every h2 within an article tag, and do the following:
		$("a").each(function (i, element) {
			
            if ( ($(this).text().trim().length > 1) &&
                 ($(this).text().substring(0,1) !== "\n") ){
                if ( result === null ){
                    result.title = $(this).text();
                    result.link  = $(this).attr("href");
                } else {
                    if ( result.link  === $(this).attr("href") ){
                        result.summary = $(this).text();
                        //console.log(i, "Result:", result);
                        //-------------------------------
                        db.Article.create(result)
                        .then(function (dbArticle) {
                            // View the added result in the console
                            console.log(dbArticle);
                        })
                        .catch(function (err) {
                            // If an error occurred, log it
                            console.log(err);
                        });
                        //-------------------------------
                        result = {};
                    } else {
                        result.title = $(this).text();
                        result.link  = $(this).attr("href");
                    };

                };
            };
			// Add the text and href of every link, and save them as properties of the result object
                
            
        });


        //writeLog( JSON.stringify(result) );
        //res.render("scrape");
        res.send("Scrape Complete");
    });
    
  });

  app.get("/sarticles", function(req, res) {
    res.render("sarticles");
  });

  app.get("/clear", function(req, res) {
    res.render("clear");
  });


  /*
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  //------------------------------------------------------
  // Doctors
  //------------------------------------------------------
  app.get("/doctors", function(req, res) {
    db.Doctor.findAll({}).then(function(dbRecords) {
      res.render("doctors", {
        msg: "Doctors Register",
        recs: dbRecords
      });
    });
  });

  app.get("/doctorsLogin", function(req, res) {
    db.Doctor.findAll({}).then(function(dbRecords) {
      res.render("doctorsLogin", {
        msg: "Doctors Login",
        recs: dbRecords
      });
    });
  });

  app.get("/doctorsMenu/:id", function(req, res) {
    db.Patient.findAll({ where: { DoctorId: req.params.id } }).then(function(
      dbRecords
    ) {
      res.render("doctorsMenu", {
        msg: "Doctors Main Menu",
        recs: dbRecords
      });
    });
  });

  app.get("/doctorsList", function(req, res) {
    db.Doctor.findAll({}).then(function(dbRecords) {
      res.render("doctorsList", {
        msg: "Available Doctors",
        recs: dbRecords
      });
    });
  });

  //------------------------------------------------------
  // Patients
  //------------------------------------------------------

  app.get("/patients", function(req, res) {
    db.Patient.findAll({}).then(function(dbRecords) {
      res.render("patients", {
        msg: "Patients Register",
        recs: dbRecords
      });
    });
  });

  app.get("/patients/:id", function(req, res) {
    db.Patient.findOne({ where: { id: req.params.id } }).then(function(
      dbRecords
    ) {
      res.render("patientsEdit", {
        msg: "Patient Information",
        recs: dbRecords
      });
    });
  });

  //------------------------------------------------------
  // Prescriptions
  //------------------------------------------------------

  app.get("/prescriptions/:dId/:pId", function(req, res) {
    console.log("(htmlRoutes)", req.params.dId, req.params.pId);
    db.Prescription.findAll({
      where: {
        idDoctor: req.params.dId,
        idPatient: req.params.pId
      }
    }).then(function(dbRecords) {
      res.render("prescriptionsList", {
        msg: "Prescriptions Log",
        recs: dbRecords
      });
    });
  });

  app.get("/prescriptions/:id", function(req, res) {
    res.render("prescriptions", {
      msg: "Create Prescription",
      recs: req.params.id
    });
  });
*/
  //-----------------------------------------

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
