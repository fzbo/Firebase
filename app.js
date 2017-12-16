
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC28Wa9GxixBTwu6gBEssFwZTrdXRAoot0",
    authDomain: "traintime-6b899.firebaseapp.com",
    databaseURL: "https://traintime-6b899.firebaseio.com",
    projectId: "traintime-6b899",
    storageBucket: "",
    messagingSenderId: "345205755438"
  };

  firebase.initializeApp(config);

  
  //THIS VAR IS USED WHEN REFERNCING THE DATABASE
  var database = firebase.database();

  //SUBMIT BUTTON FOR ADDING NEW TRAIN INFO

  $("#add-train-btn").on("click", function(){

  //USER INPUT STORED HERE
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrainTime = moment($("#train-time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequency-input").val().trim();

  //LOCAL TEMPORARY OBJECT FOR HOLDING TRAIN INFO
  var newTrain = {

    name: trainName,
    destination: destination,
    firstTrain: firstTrainTime,
    frequency: frequency
  };

  //UPLOADS TRAIN DATA TO FIREBASE
  database.ref().push(newTrain);

  //CONSOLE OUTPUT
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(firstTrain);
  console.log(newTrain.frequency);

  //ALERT-TRAIN SUCCESSFULLY LOADED
  alert("Train successfully added");

  //CLEARS OUT ALL TEXT/INPUT BOXES
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");

  //DETERMINE WHEN THE NEXT TRAIN ARRIVES
  return false;

  });

  //CREATE FIREBASE EVENT FOR ADDING DATA INPUTS TO DATABASE AND A ROW IN HTML WHEN USER CLICKS ON SUBMIT
  database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val());

  //STORE EVERYTHING IN A VARIABLE
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

  //CALCULATE MINS TILL ARRIVAL
  var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
  var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
  var tMinutes = tFrequency - tRemainder;

  // To calculate the arrival time, add the tMinutes to the currrent time
  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  console.log(tMinutes);
  console.log(tArrival);
  console.log(moment().format("hh:mm A"));
  console.log(tArrival);
  console.log(moment().format("X"));

  // Add each train's data into the table
  $("#train-schedule > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>"
  + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");



  });