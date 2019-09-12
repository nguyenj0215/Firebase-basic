$(document).ready(function () {

  //Firebase personal config info
  var firebaseConfig = {
    apiKey: "AIzaSyB_bpYimZft6D0ZxvRSswDtD3nB2d8MAyQ",
    authDomain: "train-hw-156c7.firebaseapp.com",
    databaseURL: "https://train-hw-156c7.firebaseio.com",
    projectId: "train-hw-156c7",
    storageBucket: "",
    messagingSenderId: "306529028614",
    appId: "1:306529028614:web:569f53e53ca8c7f8099187"
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

    // Getting values from input boxes
    name = $("#inputName").val().trim();
    destination = $("#inputDestination").val().trim();
    time = $("#inputTime").val().trim();
    frequency = $("#inputFrequency").val().trim();

    // Change what is saved in firebase
    database.ref().push({
      name: name,
      destination: destination,
      time: time,
      frequency: frequency,
    });

    // Clear text boxes at end of submit click function
    $("#inputName").val("")
    $("#inputDestination").val("")
    $("#inputTime").val("")
    $("#inputFrequency").val("")

  });

  //Snapshot of value changes
  database.ref().on("child_added", function (snapshot) {

    console.log(snapshot.val());

    var trainFreq = snapshot.val().frequency;
    var trainTime = snapshot.val().time;
    var trainName = snapshot.val().name;
    var trainDest = snapshot.val().destination

    var trainTime = 0

    //Referencing user input on first train time
    var firstTimeClock = moment(trainTime, "HH:mm")
    console.log(firstTimeClock)

    // Getting current time in HH:mm
    var currentTime = moment().format("HH:mm A")
    console.log(currentTime)

    //Displaying current time on page
    $("#clockDisplay").text(currentTime)

    //Difference in time between first train and current time in minutes
    var differenceTime = moment().diff(moment(firstTimeClock), "minutes")
    console.log(differenceTime)

    //Time apart 
    var timeRemainder = differenceTime % trainFreq
    console.log(timeRemainder)

    //Minutes until next train arrives
    var minutesRemaining = trainFreq - timeRemainder
    console.log(minutesRemaining)

    //Actualy time next train will arrive based on current time and minutes until arrival
    var nextTrain = moment().add(minutesRemaining, "minutes")
    console.log(moment(nextTrain).format("HH:mm"))

    var trainArrival = moment(nextTrain).format("HH:mm A")

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(trainArrival),
      $("<td>").text(minutesRemaining)
    );

    //Appending all of new div to html of page
    $("#trainDisplay").append(newRow)

  },

    //Console response if error occurs
    function (errorObject) {
      console.log(
        "The read failed: " + errorObject.code
      );
    }
  );

})