$(document).ready(function () {

  //Firebase personal config info
  var firebaseConfig = {
    apiKey: "AIzaSyBsr181qc6LPHcN34B-GvE4pE584IqNvnQ",
    authDomain: "cbc-activity.firebaseapp.com",
    databaseURL: "https://cbc-activity.firebaseio.com",
    projectId: "cbc-activity",
    storageBucket: "",
    messagingSenderId: "32775955131",
    appId: "1:32775955131:web:a4bedc0d7f1f2289ecbf9e"
  };

  //Initializing firebase 
  firebase.initializeApp(firebaseConfig);

  //Declaring database variable for firebase reference
  var database = firebase.database();

  var name = "";
  var destination = "";
  var time = "";
  var frequency = "";

  // Capture Button Click
  $("#submitButton").on("click", function (event) {

    // Don't refresh the page!
    event.preventDefault();

    name = $("#inputName").val().trim();
    destination = $("#inputDestination").val().trim();
    time = $("#inputTime").val().trim();
    frequency = $("#inputFrequency").val().trim();

    // Change what is saved in firebase
    database.ref().set({
      name: name,
      destination: destination,
      time: time,
      frequency: frequency,
    });

  });

  //Snapshot of value changes
  database.ref().on("value", function (snapshot) {

    console.log(snapshot.val());

    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().time);
    console.log(minutes)

    //Creation of new row div for all new train info, will be last to be appended
    var newDiv = $("<div>")
    newDiv.addClass("row")
    newDiv.addClass("trainInfoRow")

    //New train information divs
    var nameDiv = $("<div>")
    nameDiv.text(snapshot.val().name);
    nameDiv.addClass("col-md-3")
    newDiv.append(nameDiv)

    var destinationDiv = $("<div>")
    destinationDiv.text(snapshot.val().destination);
    destinationDiv.addClass("col-md-3")
    newDiv.append(destinationDiv)

    var frequencyDiv = $("<div>")
    frequencyDiv.text(snapshot.val().frequency);
    frequencyDiv.addClass("col-md-2")
    newDiv.append(frequencyDiv)

    var timeDiv = $("<div>")
    timeDiv.text(snapshot.val().time);
    timeDiv.addClass("col-md-2")
    newDiv.append(timeDiv)

    //Converting time to minutes for arrival time calculations
    var hm = $("#inputTime").val().trim();
    //Removing the colon from the time 
    var a = hm.split(':');
    var minutes = (+a[0]) * 60 + (+a[1]) * 60 + (+a[2]);

    var arrivalDiv = $("<div>")
    arrivalDiv.text(minutes)
    arrivalDiv.addClass("col-md-2")
    newDiv.append(arrivalDiv)

    $("#trainDisplay").append(newDiv)

  },

    //Console response if error occurs
    function (errorObject) {
      console.log(
        "The read failed: " + errorObject.code
      );
    }
  );

})