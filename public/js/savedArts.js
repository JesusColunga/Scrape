// public/js/savedArts.js

function createSCard (rec){
    const baseUrl = "https://www.reforma.com/";
    var card   = $("<div>");
    var header = $("<h5>");
    var body   = $("<div>");
    var footer = $("<div>");
    //var sumry  = $("<p>");
    //var ahref  = $("<p>");
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
              "' id='notesBtn'>Add Notes</button>"
              );
    footer.addClass("card-footer border-info text-muted");
    //footer.text("esto es una prueba");
    footer.html(
        "<input type='text' " +
        "name='note4art' " +
        "placeholder='Write your comments here' " +
        "id='" + 
        rec._id +
        "'>"
    );
    card.addClass ("card my-4 border-info");
    card.append(header);
    card.append(body);
    card.append(footer);
    /* ---------------- * /
    $.getJSON("/notes", function(data) {
        for (var i = 0; i < data.length; i++) {
          $("#sarticles").append( createSCard(data[i]) );
        }
    });
    
    /* ---------------- */
    return card;          
};
/*
<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
-----------------
<input type="text" name="nombre" id="nombre" class="nombre" value="">
<input type="button" name="boton01" id="boton01" value="Sacar el valor del input text">

*/
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
    var thisId = $(this).attr("data-id");
    console.log("notesBtn", $(this).attr("data-id"), $(thisId).val());
    $.ajax({
        method: "POST",
        url: "/addNote/" + thisId,
        data: {
          title: "",
          body: $("#notes4Art").val()
        }
      })
    .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        //$("#notes").empty();
    });
    
});
