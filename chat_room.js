
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


getData();

function logout(){
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");
}

function addRoom(){
room_name = document.getElementById("room_name").value; 
firebase.database().ref("/").child(room_name).update({
 purpose : "adding room name" });
  localStorage.setItem("room_name", room_name);
   window.location = "Chat_Page.html";
}
function getData(){
      firebase.database().ref("/").on('value', 
      function(snapshot) 
      { document.getElementById("output").innerHTML = "";
       snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; Room_names = childKey; 
            console.log("Room Name - " + Room_names); 
            row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
       document.getElementById("output").innerHTML += row; }); });
}