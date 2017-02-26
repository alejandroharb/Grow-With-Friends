$(document).ready(function() {
    //initialize modal
    $('.modal').modal();
    //================Loggin in==================
    $('#logInBtn').on('click', function(e) {
        e.preventDefault();
        //collect variables
        var email = $('#email').val().trim();
        var password = $('#password').val().trim();
        //assemble data into object
        var data = {
            email: email,
            password: password
        }
        //-----Send login data to server-----
        $.post('/log-in', data, function(response) {
            console.log(response)
            //if data doesn't exist
            if(response === false) {
                //alert user of login failure
                $('#failLogInModal').modal('open');
            } else {
                //reroute page to user's unique home page;
                var key = response.user_name;
                console.log("key is here: " + key)
                window.location.href = 'api/home/' + key;
            }
        })
    })

    //============Creating new User==============
    $('#newUserSubmit').on('click', function(e) {
        //prevent page reload upon form submit
        e.preventDefault();
        //collect form variables
        var firstName = $('#first_name').val().trim();
        var lastName = $('#last_name').val().trim();
        var userName = $('#userName').val().trim();
        var password = $('#password').val().trim();
        var email = $('#email').val().trim();
        var address = $('#address').val().trim();
        //organize data into object
        var data = {
            first: firstName,
            last: lastName,
            username: userName,
            password: password,
            email: email,
            address: address
        };
        //ajax POST for sending data to server
        $.post('/sign-up', data, function(response) {
            //if response == true, username was added, redirect user to home
            console.log(response)
            if(response) {
                var key = userName;
                window.location.href = 'api/home/' + key;
            } else {
                //username already existed, so was not added to database
                console.log("username already exists, try again.");
                $('#usernameModal').modal('open');
            }
        })
    });
})