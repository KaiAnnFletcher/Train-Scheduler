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

var trainName = ""
var destination = ""
$('#submit').on('click', function(event) {

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
});