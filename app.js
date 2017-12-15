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

  //CALCULATE NEXT ARRIVAL TIME
  //PARAMETER: TIME-TIME OF FIRST TRAIN
  //PARAMETER: FREQ - HOW OFTEN THE TRAIN COMES
  //PARAMETER: RETURN - MOMENT OBJECT OF NEXT ARRIVAL
  function calcNextArrival(time, freq){
    var mTime = moment(time,'H:mm');
    console.log(moment(mTime).format('h:mm'));
    while (mTime.diff(moment(), 'm') <= 0) {
      mTime.add(freq, 'm');
    }
      return mTime;
  }

  //CALCULATE MINUTES BEFORE TRAIN ARRIVES
  function calcMinuteAway(mArrival) {
    return(moment(mArrival).diff(moment(), 'm'));
  }

  //RETRIEVE FROM DATABASE
    database.ref().on("child_added", function(snapshot, prevChildKey){
    var trainName = snapshot.val().trainName;
    var trainDest = snapshot.val().trainDest;
    var firstTrainTime = snapshot.val().firstTrainTime;
    var frequency = snapshot.val().frequency;
    //console.log(firstTrainTime)
    updateTable(trainName, trainDest, firstTrainTime, frequency);
  });

  //DISPLAY SCHEDULE IN TABLE
  function updateTable(trainName, trainDest, firstTrainTime, frequency){
    var entry;
    var mNextArrival = calcNextArrival(10, 20);
    var minuteAway = calcMinuteAway(mNextArrival);
    var minuteAway = calcMinuteAway(mNextArrival);
    var arrivalString = moment(mNextArrival).format("h:mmA");
    // console.log(arrivalString);
  entry = `<tr><td>${name}</td><td>${dest}</td><td class="td-freq">${freq}</td><td class="td-arrival">${arrivalString}</td><td class="td-away">${minuteAway}</td></tr>`;
  $('#table-schedule > tbody').append(entry);

}
  

  //CREATE BUTTON FOR ADDING NEW TRAIN ENTRY

  $("#add-train-btn").on("click", function(event){
      event.preventDefault();
      console.log("it works");
  //RECORD USER INPUT IN VARIABLES

  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var firstTrainTime = $("#train-time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  console.log(trainName);
  //ADD TO FIREBASE VIA PUSH

  var newTrain = {
    name: trainName,
    destination: trainDest,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    
    };

  //UPLOADS NEW TRAIN INFO INTO FIREBASE

  database.ref().push(newTrain);

  console.log(newTrain.name);





















  

  





















  });