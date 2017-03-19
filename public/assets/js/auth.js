$(document).ready(function () {
    //================Loggin in==================
    $('#logInBtn').on('click', function (e) {
        e.preventDefault();
        console.log("tried to log in!!!")
        //collect variables
        var email = $('#email').val().trim();
        var password = $('#password').val().trim();
        //assemble data into object
        // var data = {
        //     email: email,
        //     password: password
        // }
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (response) {
                console.log(response);
                console.log("user signed in!")
                var key = response.uid;
                console.log("key is here: " + key)
                window.location.href = '/home/' + key;
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    });
    //============Creating new User==============
    $('#newUserSubmit').on('click', function (e) {
        //prevent page reload upon form submit
        e.preventDefault();
        //collect form variables
        var username = $('#userName').val().trim();
        var password = $('#password').val().trim();
        var email = $('#email').val().trim();
        // organize data into object
        var data = {
            username: username,
            password: password,
            email: email
        };
        //ajax POST for sending data to server
        $.ajax({
            type: "POST",
            url: '/sign-up',
            data,
            success: function (data, textStatus, xhr) {
                if (xhr.status === 200) {
                    $('#createProfileModal').modal('open');
                } else {
                    console.log(data)
                }
            }
        });
    });
    $('#newProfileSubmit').on('click', function (event) {
        event.preventDefault();
        var firstName = $('#first_name').val().trim();
        var lastName = $('#last_name').val().trim();
        var userName = $('#userName').val().trim();
        var address = $('#address').val().trim();
        var description = $('#description').val().trim();
        var data = {
            first: firstName,
            last: lastName,
            username: userName,
            address: address,
            description: description
        };
        $.ajax({
            type: "POST",
            url: '/new-profile',
            data,
            success: function (data, textStatus, xhr) {
                if (xhr.status === 200) {
                    var key = userName;
                    window.location.href = '/home/' + key
                } else {
                    console.log(data)
                    alert("Oops! Error in processing data. Working on fixing this. Sorry!");
                }
            }
        });
    });
});

function onSignIn(googleUser) {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential)
          .then(function (response) {
              console.log(response);
        })    
          .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  });
}
function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}