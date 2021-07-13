// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDQhO1O2KKA6VW_6XL4RZHXKng6MvhgF_Q",
    authDomain: "engage-with-video.firebaseapp.com",
    projectId: "engage-with-video",
    storageBucket: "engage-with-video.appspot.com",
    messagingSenderId: "156272862657",
    appId: "1:156272862657:web:37b49194575195ef83bb40",
    measurementId: "G-X1BN2MB5NH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const auth= firebase.auth();
  
  function sendVerificationEmail(){
    var user = auth.currentUser;
    
    user.sendEmailVerification().then(function() {
    // Email sent.
      window.alert("Verification mail sent to : "+ user.email);
    }).catch(function(error) {
    // An error happened.
      window.alert("error : "+errorMessage);
    });
    }

  function logIn(){
    var userEmail = document.getElementById("email_field").value;
    var userPassword = document.getElementById("password_field").value;
    auth.signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.
        var errorMessage = error.message;
        window.alert("error : " +errorMessage);
        // ...
      });
      window.alert("logged in")
  
  }
  function signUp(){
    var userEmail = document.getElementById("user_email").value;
    var userPassword = document.getElementById("user_password").value;
    auth.createUserWithEmailAndPassword(userEmail, userPassword).then(function(){
          sendVerificationEmail();
    }).catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      // ...
      window.alert("error : "+errorMessage);
    });
    username();
    }


    auth.onAuthStateChanged(function(user) {
        if (user) {
            document.getElementById("user-div").style.display = "block";
            document.getElementById("login-div").style.display = "none";
            var user = firebase.auth().currentUser;
            if(user){
                var email_id = user.email;
                var verified = user.emailVerified;
                //window.location="loggedin.html";
                //document.getElementById("msg").innerHTML="Congrats"+user.email+", you are logged in. Your email id is : "+user.email+".<br>";
        
                document.getElementById("user_para").innerHTML="Welcome User : " + email_id+"<br>Email verified : "+verified;
                if(verified){
                    window.open('/startpage.html')
                }
                else{
                    alert("please verfiy emailID")}
              //  window.location="index.html";
             }
          // User is signed in.
        } else {
            document.getElementById("user-div").style.display = "none";
            document.getElementById("login-div").style.display = "block";
            // window.location="login.html";
        
        }
        });
        
function logOut(){
    firebase.auth().signOut().then(function(){
      window.location="login.html";
    });
          
}
function username(){
    var name =document.getElementById('uname').value;
    var datab  = firebase.database().ref("users/"+firebase.auth().currentUser.uid);
    // var userInfo = datab.push();
    datab.set({
        username: name
    });
}
function retriveData(data){
    var id=auth.currentUser.uid;
    var ref=firebase.database().ref("users/"+id);
    ref.once("value").then(function(snapshot){
        var uname = snapshot.val().username;
        console.log(uname);
    })  
}
        