$(document).ready(function() {

	//array of all animals
	var myData = ["cat", "dog", "bear", "panda", "fox", "deer"];
	//write button on HTML page
	function writeButton () {
		$("<button>").addClass("btn btn-info mx-2 animalButton").appendTo($("#buttonsHolder")).attr("value", myData[i]).text(myData[i]);
	}
	// loop fuction to create buttons for each element in the array
  function writeButtonsss () {
    for (i=0; i<myData.length; i++ ) {
    	writeButton ();
    };
  }
  writeButtonsss ();

  //when click reset button, then
  $(".reset").on("click", function(){
    //empty all gifs
    $("#gifHolder").empty();
    //empty all buttons
    $("#buttonsHolder").empty();
    //reset button data to original data
    myData = ["cat", "dog", "bear", "panda", "fox", "deer"];
    //write all original data into buttons
    writeButtonsss ();
  });

	$("#creatingButton").on("click", function(){
		//prevents the submit button from trying to submit a form when clicked
    event.preventDefault();
		//a var to hold what user type in
		var userInput = $("#userInput").val().toLowerCase().trim();
		//push the word user type into the array
		myData.push(userInput);
		//create a button for the new word
		var i = myData.length -1;
		writeButton ();
	});


	// Adding click event listen listener to all buttons
  $(document).on("click", ".animalButton", function() {

  	//clear the img holder
  	$("#gifHolder").empty();

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
          var animalDiv = $("<div>").addClass("d-inline");

          // Creating and storing an image tag
          var animalImage = $("<img>").addClass("myGifs");
          // Setting the src attribute of the image to a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height_still.url).addClass("m-2");
          //give each image a id and a status, status value set as still
          animalImage.attr("id", i).attr("status", "still");

          // Appending image tag to the animalDiv
          animalDiv.append(animalImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifHolder").prepend(animalDiv);
        }

        //var to hold the img be clicked
        imgBeClicked = document.getElementsByClassName("myGifs");

        //when the image be clicked, run the function
        $(imgBeClicked).on("click", function() {

          // var k is the indext of image in all 10 images listed 
          k = $(this).attr("id");

          //if the status is still then
          if ($(this).attr("status") == "still") {
            //change img link to the animate image link
            $(this).attr("src", results[k].images.fixed_height.url);
            //change status value to animate
            $(this).attr("status", "animate");

            //if the status is animate, then
          } else {
            //change img link to the still image link
            $(this).attr("src", results[k].images.fixed_height_still.url);
            //change status value to still
            $(this).attr("status","still");
          };
        });
      });
  });
});



