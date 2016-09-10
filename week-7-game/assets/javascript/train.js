window.onload = function() 
{


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAqcNhhMuqgkjBzsRPc3D2fkS14LrFvahg",
    authDomain: "traintime-cdfd8.firebaseapp.com",
    databaseURL: "https://traintime-cdfd8.firebaseio.com",
    storageBucket: "traintime-cdfd8.appspot.com",
  };
  firebase.initializeApp(config);
 
   
     $( "#submitButton" ).click(function(e) 
     {
      
         	// creates temporary varables each time the submit button is clicked
         	var trainName = $('#trainName').val().trim();
         	var destination = $('#destination').val().trim();
         	var trainTime = $('#trainTime').val().trim();
         	var frequency = $('#frequency').val().trim();

         	 console.log(trainTime + " traintime");

            

            console.log("after math");

            // creates a temp object to store all varables
         	var newTrain = 
         	            {
         	            	tName:    trainName,
         	            	dest:     destination,
         	            	tTime:    trainTime,
         	            	freq:     frequency,
         	            };

         	 console.log('afetr object');

           // uploads to firebase
            firebase.database().ref().push(newTrain);       

            // clears form
			$("#trainName").val("");
	        $("#destination").val("");
	        $("#trainTime").val("");
	        $("#frequency").val("");

	         return false;  // needed
	        //  e.preventDefault();

      });  // end of button fun

     firebase.database().ref().on("child_added", function(childSnapshot, prevChildKey)
     {
          
       //console.log(childSnapshot.val());
            trainName   = childSnapshot.val().tName;
            destination = childSnapshot.val().dest;
            trainTime   = childSnapshot.val().tTime;
            frequency   = childSnapshot.val().freq;

             var timeCheck = moment(trainTime,"hh:mm").subtract(1, "years");
             var differnceOfTimes =  moment().diff(moment(timeCheck), "minutes");
             var mod = differnceOfTimes % frequency;
             var mAway = frequency - mod;
             var nArrival = moment().add(mAway, "minutes");

     
      
      
    	$('#trainTable > tbody').append('<tr><td>' + trainName + '</td><td>' + destination + '</td><td>' + frequency +'</td><td>' + moment(nArrival).format("hh:mm") + '</td><td>' + mAway + '</td></tr>');
     });

}