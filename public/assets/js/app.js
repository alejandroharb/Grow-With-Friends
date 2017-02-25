$(document).ready(function() {
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
        $.post('/sign-up', data, function() {
            //sends browser to specified URL 
            //need to add condition if data was added successfully
            window.location.href = '/home-redirect'
        })
    });
})