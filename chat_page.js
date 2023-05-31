const firebaseConfig = {
    apiKey: "AIzaSyBhyo1PslSLehsz_3NX6LZJ9C1kyy_Ru5s",
    authDomain: "lets-chat-128de.firebaseapp.com",
    databaseURL: "https://lets-chat-128de-default-rtdb.firebaseio.com",
    projectId: "lets-chat-128de",
    storageBucket: "lets-chat-128de.appspot.com",
    messagingSenderId: "4974555833",
    appId: "1:4974555833:web:d7fc85890cd0c2abe3e168",
    measurementId: "G-6XC3D88LFD"
  };
  
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 

 user_name = localStorage.getItem("user_name");
 room_name = localStorage.getItem("room_name");

function send()
{
msg = document.getElementById("msg").value;
firebase.database().ref(room_name).push({
 name:user_name,
 message:msg,
 like:0
});

document.getElementById("msg").value = "";
}

function getData() {
firebase.database().ref("/"+room_name).on('value', function(snapshot) {
   document.getElementById("output").innerHTML = "";
 snapshot.forEach(function(childSnapshot) {
    childKey  = childSnapshot.key;
    childData = childSnapshot.val();
    if(childKey != "purpose")
    {
      firebase_message_id = childKey;
      message_data = childData;

        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
      row = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>"+ message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";       
     document.getElementById("output").innerHTML += row;
    }
 });
});
}

getData();

function updateLike(message_id)
{
 button_id = message_id;
 likes = document.getElementById(button_id).value;
 likes_in_number = Number(likes) + 1;
 console.log(likes_in_number);

 firebase.database().ref(room_name).child(message_id).update({
     like : likes_in_number
  });

}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");
}
