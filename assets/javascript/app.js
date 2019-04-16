// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDeVba6NCqO6kkklaZolBIycS5ve2t5lvk",
    authDomain: "train-scheduler-project-3d23f.firebaseapp.com",
    databaseURL: "https://train-scheduler-project-3d23f.firebaseio.com",
    projectId: "train-scheduler-project-3d23f",
    storageBucket: "train-scheduler-project-3d23f.appspot.com",
    messagingSenderId: "787187388422"
  };

  firebase.initializeApp(config);

  var dataRef = firebase.database();

/*Moment notes*/ 
var trainFrequency = 5;

var firstTime = "1:00";
/* Use first time as a reference point*/

var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log('firstTimeConverted', firstTimeConverted);

//Current Time
var currentTime = moment();
console.log(currentTime);
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

//Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

//Time Apart (remainder)
var timeRemainder = diffTime % trainFrequency;
console.log(timeRemainder);

//Minutes until train
var minutesTillTrain = trainFrequency - timeRemainder;
console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

// Next Train
var nextTrain = moment().add(minutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

//Initial values
var trainName = $("#form-train-name").val().trim();
var destination = $("#form-destination").val().trim();
var formFirstTrain = $("#form-first-train-time").val().trim()
var formFrequency = $("#form-frequency").val().trim();

//Capture Button Click
$("#submit").on("click", function(event) {
event.preventDefault();

trainName = $("#form-train-name").val().trim();
destination = $("#form-destination").val().trim();
formFirstTrain = $("#form-first-train-time").val().trim();
formFrequency = $("#form-frequency").val().trim();

//Code for the push
dataRef.ref().push({
  trainName: trainName,
  destination: destination,
  formFirstTrain: formFirstTrain,
  formFrequency: formFrequency
});
});

// Firebase watcher + initial loader HINT: .on("value")
dataRef.ref().on("child_added", function(snapshot) {
//Redefine moment values so that they can be dynamic
var firstTimeConverted = moment(snapshot.val().formFirstTrain, "HH:mm").subtract(1, "years");
console.log('firstTimeConverted', firstTimeConverted);

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

var timeRemainder = diffTime % snapshot.val().formFrequency;
console.log(timeRemainder);

var minutesTillTrain = snapshot.val().formFrequency - timeRemainder;
console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

var nextTrain = moment().add(minutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// Log everything that's coming out of snapshot

    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().formFirstTrain);
    console.log(snapshot.val().formFrequency);

      //change the HTML on submit

      $("#train-name").append("<div id='train-name-added'>" + snapshot.val().trainName + "</div>");
      $("#destination").append("<div id='destination-added'>" + snapshot.val().destination + "</div>");
      $("#frequency").append("<div id='form-frequency-added'>" + snapshot.val().formFrequency + "</div>");
      $("#next-arrival").append("<div id='next-train-added'>" + moment(nextTrain).format("LT") + "</div>")
      $("#minutes-away").append("<div id='minutes-till-train-added'>" + minutesTillTrain + "</div>");

      //$("#train-name").append(snapshot.val().trainName);
      //$("#destination").append(snapshot.val().destination);
      //$("#frequency").append(snapshot.val().formFrequency);
      //$("#next-arrival").append(nextTrain);
      //$("#minutes-away").append(minutesTillTrain);
    },
    function errorHandling(errorObject) {
    console.log("The read failed: " + errorObject.code);
});