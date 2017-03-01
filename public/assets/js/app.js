
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
    // //=====SCORE MODAL======
    // var activityModal = "";
    //
    // // they are all opening same modal on-click, did not change original id="golfModal" yet
    // $('#golfScoreBtn').on('click', function(e) {
    //     e.preventDefault();
    //     activityModal = "";
    //     activityModal = "golf";
    //     $('#golfModal').modal('open');
    // });
    // $('#guitarScoreBtn').on('click', function(e) {
    //     e.preventDefault();
    //     activityModal = "";
    //     activityModal = "guitar";
    //     $('#golfModal').modal('open');
    // });
    // $('#langScoreBtn').on('click', function(e) {
    //     e.preventDefault();
    //     activityModal = "";
    //     activityModal = "lang";
    //     $('#golfModal').modal('open');
    // });
    //
    // //==========Submit Golf Score===============
    // $('#submitGolfScore').on('click', function(e) {
    //     e.preventDefault();
    //
    //     //collect variables with data
    //     var score = $('#golfScore').val();
    //     var userName = $('#userName').val().trim();
    //     var data = {
    //         score: score,
    //         username: userName
    //     }
    //     console.log(data)
    //     console.log("activityModal: " + activityModal);
    //
    //     // filter data by activity type
    //     if (activityModal == "golf") {
    //         var url = '/score/golf';
    //     } else if (activityModal == "guitar") {
    //         var url = '/score/guitar';
    //     } else {
    //         var url = '/score/lang';
    //     }
    //
    //     $.post(url, data, function(response) {
    //         console.log(response);
    //     })
    // })
    //
    // //==========Get Golf Score and Graph===============
    // // filtering thorugh class getChartData
    // $('.getChartData').on('click', function(e) {
    //     e.preventDefault();
    //     var username = $('#user-name').attr('value');
    //     activityModal = "";
    //     activityModal = $(this).data("activity");
    //     // console.log("graph activityModal: " + activityModal);
    //
    //     var url = '/get-data/' + activityModal + '/' + username;
    //     console.log("this is the URL: " + url)
    //     $.get(url, function(response) {
    //         var data = response;
    //         console.log(data[0]);
    //         console.log(data[1]);
    //         console.log(data[2]);
    //     // plot graph *********************
    //     $("#chartDiv").empty();
    //     $('#chartDiv').append('<canvas id="chartArea" height="400" width="400"></canvas>');
    //     var ctx = $("#chartArea");
    //     var bars_config = {
    //         type: 'line',
    //         data: {
    //             labels: data[0],
    //             datasets: [{
    //               label: data[1],
    //               data: data[2]
    //             }]
    //         },
    //         options: {
    //           responsive: true,
    //           maintainAspectRatio: false,
    //           scales: {
    //             yAxes: [{
    //               scaleLabel: {
    //                 display: true,
    //                 labelString: 'score'
    //               }
    //             }],
    //             xAxes: [{
    //               scaleLabel: {
    //                 display: true,
    //                 labelString: 'date'
    //               }
    //             }]
    //           }
    //         }
    //     } // end bars config
    //     // empty chartarea before replotting
    //
    //     var myChart = new Chart(ctx, bars_config);
    //     });
    // });

    //================UPDATE PROFILE==================

    //     var myChart = new Chart(ctx, bars_config);

    //         //-----
    //     })
    // })
    //================UPDATE PROFILE SETTINGS==================

    $('#updateProfileModal').on('click', function () {
        $('#updateProfile').modal('open');
    })
    // =============== USER Setting Skills===================
    $('#setSkillsBtn').on('click', function() {
        $('#setSkillsModal').modal('open');
    })
    $('#addGolfSkillBtn').on('click', function () {
        $('#addGolfSkillsDataModal').modal('open');
    })
    //==============SENDING GOLF SKILL DATA=====================
    $("#submitGolfSkillData").on('click', function (e) {
        e.preventDefault();
        //collect data
        var username = $('#user').val()
        var years = $('#golfYearsExperience').val();
        var rating = $('#golfRating').val();
        var data = {
            year_experience: years,
            experience_rating: rating
        }
        var url = '/api/choices/golf/' + username;
        console.log(url)
        //AJAX POST
        $.post(url, data, function (response) {
            console.log(response);
        })
    });
    //=================GETTING MATCHED===================
    //---MODAL---
    $('#getMatchedBtn').on('click', function () {
        $('#getMatchedModal').modal('open');
    })
    //---sending data for matching---
    $('#matchGolf').on('click', function () {
        $('#preloaderInsert').addClass('progress');
        var username = $('#matchUserName').val();
        var url = "/match/golf/" + username;
        $.get(url, function (response) {
            $('#preloaderInsert').removeClass('progress');
            $('#getMatchedModal').modal('close');
            console.log("======match data======")
            console.log(response);
            //======process data insertion here======
            // $('#matchContentInsert')
            $('#matchesModal').modal('open');
        })
    })
})
