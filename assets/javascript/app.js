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

    // Clear text boxes at end of submit click function
    $("#inputName").val("")
    $("#inputDestination").val("")
    $("#inputTime").val("")
    $("#inputFrequency").val("")

  });

  //Snapshot of value changes
  database.ref().on("value", function (snapshot) {

    console.log(snapshot.val());

    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
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

    //Need to understand moment section better

    var trainFreq;

    var trainTime = 0

    var firstTimeClock = moment(trainTime, "HH:mm")
    console.log(firstTimeClock)

    // Getting current time in HH:mm
    var currentTime = moment()
    console.log(currentTime.format("HH:mm"))

    //Difference in time between first train and current time in minutes
    var differenceTime  = moment().diff(moment(firstTimeClock), "minutes")
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
    arrivalDiv.text(moment(nextTrain).format("HH:mm"));
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