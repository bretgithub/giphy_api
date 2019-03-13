"use strict";
// loads on load
$(document).ready(function () {

    // initial array of drag queens
    var dragQueenArray = [
        "RuPaul",
        "Bianca Del Rio",
        "Bob The Drag Queen",
        "Katya",
        "Trixie Mattel",
        "Kim Chi",
        "Manila Luzon"
    ];

    // displayDragQueens function re-renders the HTML to display the appropriate content when buttons are clicked
    function displayDragQueens() {

        // var dragQueen is assigned the value which will get the contents of the attribute data-id as str
        var dragQueen = $(this).attr("data-name"); // ***

        // var queryURL will scrape giphy with search query with API key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dragQueen + "&api_key=hTTpu3YewaDlSxMBdWqbyQBFaHpL6duw&limit=10";

        // creates AJAX call for the specific drag queen button being clicked (based on the string and pulling from giphy with GET)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            // empties the div and re-populates when a new button is clicked
            $("#drag-queen-view").empty();

            // assigns results with the response data - limited to 10 in queryURL
            var results = response.data;

            // retrieves the rating data
            console.log(response);

            // Loops the drag queen for limit 10 and adds image, rating, state 
            for (var i = 0; i < results.length; i++) {

                // creates a div to hold the drag queens
                var dragQueenDiv = $("<div>");

                // adds class to div which is styled in style.css
                dragQueenDiv.addClass("drag-queen-pictures");

                // creates an element to have the rating displayed with corresponding image
                var rating = results[i].rating;

                // text displaying rating
                var p = $("<h2>").text("Rating: " + rating);

                // adds attributes to divs 
                var dragQueenImage = $("<img>");
                dragQueenImage.attr("src", results[i].images.fixed_height_still.url);
                dragQueenImage.attr("data-still", results[i].images.fixed_height_still.url);
                dragQueenImage.attr("data-animate", results[i].images.fixed_height.url);
                dragQueenImage.attr("data-state", "still");
                dragQueenImage.addClass('dragQueenImage');

                // appends rating to div
                dragQueenDiv.append(p);

                // appends drag queen image
                dragQueenDiv.append(dragQueenImage);
                $("#drag-queen-view").append(dragQueenDiv);
            }

            // state change, with click shifts from still to animated, another click will change state
            $(".dragQueenImage").on("click", function () {
                var state = $(this).attr("data-state");
                console.log(state);

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }

    // function for displaying drag queen data
    function renderButtons() {

        // empties the gifs prior to adding new gifs
        $("#drag-queen-buttons").empty();

        // loop through array 
        for (var i = 0; i < dragQueenArray.length; i++) {

            // dynamicaly generates buttons for each drag queen in the array
            // this code $("<button>") is all jQuery needs to create the opening and closing tags. (<button></button>)
            var dragQueenAdd = $("<button>");

            // adds a class of dragQueen to our button
            dragQueenAdd.addClass("dragQueen");

            // added a data-attribute "data-name"
            dragQueenAdd.attr("data-name", dragQueenArray[i]);

            // provided the initial button text
            dragQueenAdd.text(dragQueenArray[i]);

            // added the button to the buttons-view div
            $("#drag-queen-buttons").append(dragQueenAdd);
        }
    }

    // this function 'event' handles events where the add drag queen button is clicked
    $("#add-drag-queen").on("click", function (event) {

        event.preventDefault();

        // this will grab the input from the textbox
        var dragQueen = $("#drag-queen-input").val().trim();

        // the drag queen from the textbox is then added to our array
        dragQueenArray.push(dragQueen);

        // calling renderButtons which handles the processing of our dragQueenArray, displaying buttons
        renderButtons();
    });

    // adding click event listeners to all elements with a class of dragQueen
    $(document).on("click", ".dragQueen", displayDragQueens);

    // calling the renderButtons function to display the intial buttons
    renderButtons();
});
