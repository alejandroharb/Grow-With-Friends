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

        //collecting image file:
        // var form = $('form')[0];

        // var formData = new FormData(form);
        // var imageFile = $('input[type=file]')[0].files[0];
        // formData.append('image',);
        // console.log(imageFile)
        // console.log(formData)

        //collect form variables
        var firstName = $('#first_name').val().trim();
        var lastName = $('#last_name').val().trim();
        var userName = $('#userName').val().trim();
        var password = $('#password').val().trim();
        var email = $('#email').val().trim();
        var address = $('#address').val().trim();

        // organize data into object
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
                //===========ROUTE USER TO CREATE PROFILE PAGE===============
                var key = userName;
                window.location.href = 'api/home/' + key;
            } else {
                //username already existed, so was not added to database
                console.log("username already exists, try again.");
                $('#usernameModal').modal('open');
            }
        })
    });
    //=====SCORE MODAL======
    $('#golfScoreBtn').on('click', function(e) {
        e.preventDefault();
        $('#golfModal').modal('open');
    })
    //==========Submit Golf Score===============
    $('#submitGolfScore').on('click', function(e) {
        e.preventDefault();
        //collect variables with data
        var score = $('#golfScore').val();
        var userName = $('#userName').val().trim();
        var data = {
            score: score,
            username: userName
        }
        console.log(data)
        var url = '/score/golf'
        $.post(url, data, function(response) {
            console.log(response);
        })
    })
    //==========Get Golf Data===============
    $('#getGolfChartData').on('click', function(e) {
        e.preventDefault();
        var username = $('#user-name').attr('value');
        var url = '/get-golf-data/'+username;
        console.log("this is the URL: " + url)
        $.get(url, function(response) {
            var data = response;
            console.log(data);
        })
    })
    $('#updateProfileModal').on('click', function () {
        $('#updateProfile').modal('open');
    })
})