$(document).ready(function() {
    $('#newUserSubmit').on('click', function(e) {
        e.preventDefault();

        var firstName = $('#first_name').val().trim();
        var lastName = $('#last_name').val().trim();
        var userName = $('#userName').val().trim();
        var password = $('#password').val().trim();
        var email = $('#email').val().trim();
        var address = $('#address').val().trim();

        var data = {
            first: firstName,
            last: lastName,
            username: userName,
            password: password,
            email: email,
            address: address
        };

        $.post('/sign-up', data, function(res) {
            console.log(res);
        })
    })
})