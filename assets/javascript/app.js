// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCaANtWiObSDj08dW55YoyaAPf696NgHbk",
    authDomain: "train-scheduler-a5eba.firebaseapp.com",
    databaseURL: "https://train-scheduler-a5eba.firebaseio.com",
    projectId: "train-scheduler-a5eba",
    storageBucket: "train-scheduler-a5eba.appspot.com",
    messagingSenderId: "156527369811"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

/*Declare all variables that need to be 
added to div sections dynamically*/ 
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

var trainName = $("#form-train-name").val().trim();
var destination = $("#form-destination").val().trim();

console.log(trainName);
console.log(destination);
debugger;
//Save Firebase data
database.ref("/trainData").on("value", function(snapshot) {

    if (snapshot.child("trainName").exists() && snapshot.child("destination").exists() && snapshot.child("trainFrequency").exists() && snapshot.child("firstTimeConverted").exists()) {

      //set the variables to be equal to the variables that above related to to the moment calculations
      trainName = snapshot.val().trainName;
      destination = snapshot.val().destination;
      trainFrequency = snapshot.val().trainFrequency;
      firstTimeConverted = snapshot.val().firstTimeConverted;

      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().trainFrequency);
      console.log(snapshot.val().firstTimeConverted);
    }

    $("#submit").on("click", function(event) {
      event.preventDefault();
    
      //change the HTML on submit
    
      $("#train-name").text(snapshot.val().trainName);
      $("#destination").text(snapshot.val().destination);
      $("#frequency").text(snapshot.val().trainFrequency);
      $("#next-arrival").text(nextTrain);
      $("#minutes-away").text(minutesTillTrain);
    });
});

function errorHandling (errorObject) {
console.log("The read failed: " + errorObject.code);
}


/*$('#submit').on('click', function(event) {

event.preventDefault();

trainName= $('#form-train-name').val().trim(); 
$("#train-name").append(trainName);
console.log(trainName)

destination= $('#form-destination').val().trim();
$("#destination").append(destination);
console.log(destination);

firstTime= $('#form-first-train-time').val().trim();
$("#next-arrival").append(nextTrain);
console.log(nextTrain);
});*/

//create a new div with each time the history is recalled from firebase