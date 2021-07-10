const socket = io("/");
const videogrid = document.getElementById("video-grid");
const peer = new Peer(undefined, {
    host: "peer-js-server-by-akki.herokuapp.com",
    port: 443,
    secure: true,
});
const people = {};


const myvideo = document.createElement("video");//for video representation of each user
myvideo.classList.add("user-video");
myvideo.muted = true;//this is because our own voice shouldnt be heard by ourselves
//for user name
const name_user = prompt("Enter your Name");

let myVideoStream;

//on peer connection ,when new user connects to the website
peer.on("open", (id) => {
    socket.emit("join-room", ROOM_ID, id,name_user);
    console.log("connected to peer",id,ROOM_ID);
});
//webRTC methods for streaming the video and audio sources of the user
navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: {
            echoCancellation: true,
            noiseSuppression: true
         },
        // mandatory: {
        //     chromeMediaSource: 'screen',
        //     maxWidth: 1280,
        //     maxHeight: 720
        // }
    })
    .then((stream) => {
        myVideoStream=stream;
        addVideoStream(myvideo, stream);
        //when the user-connected function is emitted from server the user will get connected via newUserConnection
        socket.on("user-connected", (userID,userName) => {
            newUserConnection(userID, stream);
        });
        //call function sends the request to other peer throught peer.on function whenever the peer accepts the call ,the call ill be established.
        peer.on("call", (call) => {
            call.answer(stream);
            const video = document.createElement("video");
            //and here ther video element(source) or stream gets appeneded in our video stream i.e video-grid
            call.on("stream", (userVideoStream) => {
                addVideoStream(video, userVideoStream);
            });
        });   
    })
    .catch((err) => alert(err.message));//if somewhere goes wrong then the alert box with error message get poped up on the screen

  //the input is taken from the user in the message box.  
let reply = $('input');
//keydown function allows us to use the keyboard buttons and converts them into ASCII code
$('html').keydown((e) => {
    if (e.which == 13 && reply.val().length !== 0) {//here if the keydown value is enter and reply(i.e text value) is atleast one character then the message function gets emitted
        socket.emit('message', reply.val());
        reply.val('');
    }
})
//here the message gets appended to the chat box 
socket.on('createMessage', (message,userName) => {
    $('#messages').append(`<li class"message><b><i class="fas fa-user-circle"></i><span style="color:#383838"> ${userName}</span>:&emsp;<span style="color:black;opacity:0.8,font-size:5px;">${new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }</span></b><br/>${message}</li>`)
    scrollToBottom();
});
 
//here the new user get added into the call by adding into video stream
function newUserConnection(userID, stream,userName) {
const call = peer.call(userID, stream);
const video = document.createElement("video");
call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
});
//whenever the call gets ended the user will get removed from the video grid and call
call.on("close", () => {
    video.remove();
});    
people[userID] = call;
}

//the video element(stream) of each user gets appended into the video grid and css styling is done
function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
        video.play();
    });
    videogrid.append(video);
let users = document.getElementsByTagName("video").length;//for number of users in the video-grid
if (users > 1) {
    users=users+1;
    videogrid.style.flexBasis = (1 / users)*100 + "%";
}
else{
    videogrid.style.flexBasis = "55%";
}
}

//                                          user disconnection
socket.on("user-disconnected", (userID,userName) => {
    if (people[userID]) people[userID].close();   
let users = document.getElementsByTagName("video").length;

//the below code is for flex-basis ,so that every video element will get proper amount of space to occupy
if (users > 1) {
    users=users+1;
    videogrid.style.flexBasis = (1 / users)*100 + "%";
}
else{
    videogrid.style.flexBasis = "55%";
}
});

//                                  mute and unmute buttons and their functionalities
const audioToggle = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        UnmuteButton();
    } else {
        MuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

// to change the innerhtml icon into mutton button
const MuteButton = () => {
    const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
    `;

    document.querySelector('.MuteButton').innerHTML = html;
}
// to change the innerHTML icon into unmute button
const UnmuteButton = () => {
    const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
    `;

    document.querySelector('.MuteButton').innerHTML = html;
}

const scrollToBottom = () => {
    let d = $('.mainChatWindow');
    d.scrollTop(d.prop("scrollHeight"));
}

//                                      video-on and video-off buttons and their functionalities

const videoToggle = () => {
    const enabled = myVideoStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;

        videoOn();
    } else {
        videoOff();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

// to change the innerHTML icon into video-on button

const videoOn = () => {
    const html = `
    <i class="unmute fas fa-video-slash"></i>
    <span>Play Video</span>
    `;

    document.querySelector('.VideoButton').innerHTML = html;
}

//to change the innerHTML icon into video-off button

const videoOff = () => {
    const html = `
    <i class="fas fa-video"></i>
    <span>Stop Video</span>
    `;

    document.querySelector('.VideoButton').innerHTML = html;
}

//                                                  for pop-up chat window

const chatToggle =(showDiv) =>{
    var popup=document.getElementById("rightpage");
    var left = document.getElementById("leftpage");
    if(showDiv.val == "yes"){
        showDiv.style.cssText="color:white";
        popup.style.cssText = "display:none;flex:0";
        left.style.cssText="flex:1";
        showDiv.val = "no";
     }
     else{
        showDiv.style.cssText="color:khaki";
        popup.style.cssText="display:flex;flex:0.2";
        left.style.cssText="flex:0.8";
        showDiv.val = "yes"; 
        
     }
 }



//                                                   invite people

 const addPeople = () => {
            navigator.clipboard.writeText(window.location.href).then(function() {
              alert("Invite link copied to the clipboard!Share it with your folks!!")
            }, function(err) {
              alert('Failed to copy');
            });
 };


//                                             hand raise feature
const handraise = (handrise) => {
  var Handrise = document.getElementById('handrise');
//   let colorborder = document.getElementsByTagName("video");

  if(Handrise.val=="yes"){
    // colorborder.style.cssText="border-color:red" ;
    $('video').css('border-color', 'white');
    Handrise.style.color="#D2D2D2";
      Handrise.val="no";
      socket.emit('lower-hand'); 
  }
  else{
      Handrise.style.color="yellow";
      Handrise.val="yes";
      socket.emit('raise-hand');
  }
};

$('.box').on('click', function(e){
    e.preventDefault();
    $(this).css('border-color', 'lime');
  });
//whenevr the hand is raised ,this message gets appended in chat box
socket.on('handrise', userName =>{
  $("ul").append(`<h6><li class="message" style="color:yellow"><br/>Hand Raised by  ${userName}</li></h6>`);
})
//whenevr the hand is lowered ,this message gets appended in chat box

socket.on('lowerhand', userName =>{
    $("ul").append(`<h6><li class="message" style="color:green"><br/>Hand Lowered by  ${userName}</li></h6>`);
  })

//                                  for date and time visibility feature

function timer(){
    var currentTime = new Date()
   var hours = currentTime.getHours()
   var minutes = currentTime.getMinutes()
   var sec = currentTime.getSeconds()
   if (minutes < 10){
       minutes = "0" + minutes
   }
   if (sec < 10){
       sec = "0" + sec
   }
   var t_str = hours + ":" + minutes + ":" + sec + " ";
   if(hours > 11){
       t_str += "PM";
   } else {
      t_str += "AM";
   }
    document.getElementById('datetime').innerHTML = t_str;
    setTimeout(timer,1000);
}

//                                                  exit feature
function leaves(){
    if(confirm("Are you sure?")){
      var myWindow = window.open("endpage.html", "_self");
  }
   }