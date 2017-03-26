$(document).ready(function () {
    //initialize modal
    $('.modal').modal();
    // Initialize collapse button
    $(".button-collapse").sideNav();
    
    $('#updateProfileModal').on('click', function () {
        $('#updateProfile').modal('open');
    })
    // =============== USER Setting Skills===================
    $('#setSkillsBtn').on('click', function () {
        $('#setSkillsModal').modal('open');
    })
    $('#addGolfSkillBtn').on('click', function () {
        $('#addGolfSkillsDataModal').modal('open');
    })
    $('#addGuitarSkillBtn').on('click', function () {
        $('#addGuitarSkillsDataModal').modal('open');
    })
    //==============SENDING GOLF SKILL DATA=====================
    $("#submitGolfSkillData").on('click', function (e) {
        e.preventDefault();
        //collect data
        var username = $('#user').val()
        var years = $('#golfYearsExperience').val();
        years = parseInt(years);
        var rating = $('input[name="golf-rating"]:checked').val();
        rating = parseInt(rating);
        console.log("rating value from radio button: " + rating)
        var data = {
            year_experience: years,
            experience_rating: rating
        }
        var url = '/api/choices/golf/' + username;
        // console.log(url)
        //AJAX POST
        $.post(url, data, function (response) {
            // console.log(response);
            Materialize.toast("Saved", 3000);
        })
    });
    //==============SENDING Guitar SKILL DATA=====================
    $("#submitGuitarSkillData").on('click', function (e) {
        e.preventDefault();
        //collect data
        var username = $('#user').val()
        var years = $('#guitarYearsExperience').val();
        years = parseInt(years);
        var rating = $('input[name="guitar-rating"]:checked').val();
        rating = parseInt(rating);
        console.log("rating value from radio button: " + rating)
        var data = {
            year_experience: years,
            experience_rating: rating
        }
        var url = '/api/choices/guitar/' + username;
        // console.log(url)
        //AJAX POST
        $.post(url, data, function (response) {
            // console.log(response);
            Materialize.toast("Saved", 3000);
        })
    }); 
});