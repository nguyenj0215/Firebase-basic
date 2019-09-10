$(document).ready(function () {

  var firebaseConfig = {
    apiKey: "AIzaSyBsr181qc6LPHcN34B-GvE4pE584IqNvnQ",
    authDomain: "cbc-activity.firebaseapp.com",
    databaseURL: "https://cbc-activity.firebaseio.com",
    projectId: "cbc-activity",
    storageBucket: "",
    messagingSenderId: "32775955131",
    appId: "1:32775955131:web:a4bedc0d7f1f2289ecbf9e"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  database.ref().on("value", function (snapshot) {

      console.log(snapshot.val());

      console.log(snapshot.val().name);
      console.log(snapshot.val().age);
      console.log(snapshot.val().phone);

      // Change the HTML
      $("#displayed-data").text(snapshot.val().name);

    },
    function (errorObject) {
      console.log(
        "The read failed: " + errorObject.code
      );
    }
  );

})