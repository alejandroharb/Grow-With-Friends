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
    //============entering User info==============
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
    $('#unauthLoginRedirect').on('click', function () {
        window.location.href = '/';
    })
    $('#unauthSignUpRedirect').on('click', function () {
        window.location.href = '/create-user';
    })
    $('#googleSignIn').on('click', function () {
        googleSignIn();
    })
    $('#userSignOut').on('click', function () {
        userSignOut();
    })
});
var provider = new firebase.auth.GoogleAuthProvider();
function googleSignIn() {
    //firebase popup google sign in function
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    });
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var url = '/user/authenticate';
            $.ajax({
                method: 'POST',
                url: url,
                data: { uid: user.uid }
            }).then(function (response) {
                window.location.href = '/home/' + user.uid;
            });
        };
    });
};
// function checkAuthStatus() {
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             // User is signed in.
//             var url = '/user/authenticate';
//             $.ajax({
//                 method: 'POST',
//                 url: url,
//                 data: { uid: user.uid }
//             }).then(function (response) {
//                 window.location.href = '/home/' + user.uid;
//             });
//         };
//     });
// }
function userSignOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        console.log("user signed out!")
    }).catch(function (error) {
        // An error happened.
        console.log(error);
        });
    firebase.auth().onAuthStateChanged(function (user) {
        if (!user) {
            // User is signed in.
            var url = '/user/authenticate/signout';
            $.ajax({
                method: 'GET',
                url: url,
            }).then(function (response) {
                window.location.href = '/';
            });
        } else {
            console.log("user still signed in")
            console.log(user)
        }
    });
}
