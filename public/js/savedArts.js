// public/js/savedArts.js

function createSCard (rec){
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
              "<a href='/unsaveArt/" + 
              rec._id + "' " +
              "class='badge badge-pill badge-danger' " +
              "data-id='" + 
              rec._id +
              "'>Delete from saved</a> " +
              "<button " +
              "class='badge badge-pill badge-success' " +
              "data-id='" + 
              rec._id +
              "' id='notesBtn'>Article Notes</button>"

              );
    card.addClass ("card my-4 border-info");
    card.append(header);
    card.append(body);
    return card;          
};

$.getJSON("/sarticles", function(data) {
    for (var i = 0; i < data.length; i++) {
      $("#sarticles").append( createSCard(data[i]) );
    }
});

$("#topBtn").on("click", function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

$("#sarticles").on("click", "#notesBtn", function(){
    console.log("notesBtn", $(this).attr("data-id"));
});
