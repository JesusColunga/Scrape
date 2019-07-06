// public/js/index.js

// Get references to page elements
/*
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
*/
/*
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});
*/
/*
$.getJSON("/articles", function(data) {
    res.json(data);
});
*/
/* <button class="badge badge-pill badge-warning" id="saveArtBtn"> Save Article </button> */
function createCard (rec){
    const baseUrl = "https://www.reforma.com/";
    var card   = $("<div>");
    var header = $("<h5>");
    var body   = $("<div>");
    var sumry  = $("<p>");
    var ahref  = $("<p>");
    header.addClass("card-header");
    header.html(
        "<a href=" +
        baseUrl    +
        rec.link   +
        " class='text-success' target='_blank'>" +
        rec.title  +
        "</a>"
    );
    body.addClass("card-body");
    body.html('<p class="card-text">' +
              rec.summary +
              "</p>" +
              "<button class='badge badge-pill badge-warning' " +
              "id='saveArtBtn'" +
              "data-id='" + 
              rec._id +
              "'> Save Article </button>"
              );
    card.addClass ("card my-4 border-info");
    card.append(header);
    card.append(body);
    return card;          
};

$.getJSON("/articles", function(data) {
    //console.log("Data de articles:", data);
    
    for (var i = 0; i < data.length; i++) {
      //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      $("#articles").append( createCard(data[i]) );
    }
});

$("#topBtn").on("click", function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

$(".card").on("click", ".badge-warning", function(){
    console.log("clic en boton save article");
});


/* -----      
<div id="articles">
    {{#each articles}}
        <div class="card">                                                card
            <h5 class="card-header"> {{title}} </h5>                      header
            <div class="card-body">                                       body
                <p class="card-text"> {{summary}} </p>
                <a href="#" class="btn btn-primary">Save Article</a>
                <button class="badge badge-pill badge-warning" id="saveArtBtn"> Save Article </button>
            </div>
        </div>
    {{/each}}
</div>

   ----- */