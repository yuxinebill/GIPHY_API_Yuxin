$(document).ready(function() {

	//array of all animals
	var myData = ["Cat", "Dog", "Bear", "Panda", "Fox", "Deer"];

	// loop fuction to create buttons for each element in the array
	for (i=0; i<myData.length; i++ ) {
		//write button on HTML page
		$("<button>").addClass("btn btn-info mx-2").appendTo($("#buttonsHolder")).attr("value", myData[i]).text(myData[i]);
	};

	//a var to hold what user type in
	var userTypeIn = event.key



 	// Adding click event listen listener to all buttons
    $("button").on("click", function() {
      // Grabbing and storing the data-animal property value from the button
      var animal = $(this).attr("value");

      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);

            // Appending image tag to the animalDiv
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifHolder").prepend(animalDiv);
          }
        });
    });






	
});



