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

    //Creation of new row div for all new train info, will be last to be appended
    //Seems like only most recent addition is being saved in database
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

    var trainFreq;

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

    var arrivalDiv = $("<div>")
    arrivalDiv.text(moment(nextTrain).format("HH:mm A"));
    arrivalDiv.addClass("col-md-2")
    newDiv.append(arrivalDiv)

    var minutesDiv = $("<div>")
    minutesDiv.text(minutesRemaining);
    minutesDiv.addClass("col-md-2")
    newDiv.append(minutesDiv)

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