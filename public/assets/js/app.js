

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
        var yelpAddress;
        //========GET GOLF MATCHES=========
        $.get(url, function (response) {
            $('#preloaderInsert').removeClass('progress');
            $('#getMatchedModal').modal('close');
            
            //get user's location for yelp API
            yelpAddress = response[0].userHome;
            var data = response
            //======process data insertion here======
            for(var i = 1; i < data.length; i++) {
                var image = data[i].userImg;
                var name = data[i].user;
                var years = data[i].years;
                var dist = data[i].distance;
                // console.log(name)
                createCollectionItem(image, name, years, dist)
            };
            // //=====YELP API=====
            var yelpURL = '/api/yelp';
            var yelpData = {address: yelpAddress}
            $.post(yelpURL, yelpData, function(yelpResponse) {
                console.log(yelpResponse);
                // getGoogleMap(yelpAddress, yelpResponse)
                for(var i =0; i< yelpResponse.length; i++) {
                    var url = yelpResponse[i].url;
                    var titleName = yelpResponse[i].name;
                    var imageLink = yelpResponse[i].image_url;
                    var rating = yelpResponse[i].rating_img_url;
                    var businessDistance = yelpResponse[i].distance * .000621;
                    businessDistance = businessDistance.toFixed(1);
                    createYelpCollection(url,titleName,imageLink,rating, businessDistance)
                }
                
            })
            $('#matchesModal').modal('open');
        });
        
        
    })
    $('#chosenUser').on('click', function() {
        console.log('clicked to chat')
        $('#matchesModal').modal('close');
        $('#messagingModal').modal('open');
        var name = $(this).data('name');
        var img = $(this).data('img');
        var imageElem = $('<img>').attr('src', "/uploads/images/"+img);
        var newH4 = $('<h4>').html(name)
        $('#messageUserImg').append(imageElem);
        $('#messageUserName').append(newH4);
    })
})

function createYelpCollection(url, title, imgURL, rating, distance) {
    var colDiv = $('<div>').attr('class',"col s12");
    var titleLink = $('<a>').attr({href: url, "target": "_blank"}).html(title);
    var newH2 = $('<h2>').attr('class','header').html(titleLink);
    var cardDiv = $('<div>').attr('class', 'card horizontal hoverable');
    var cardImgDiv = $('<div>').attr('class', 'card-image');
    var img = $('<img>').attr('src', imgURL);
    var cardStackedDiv = $('<div>').attr('class','card-stacked');
    var cardContentDiv = $('<div>').attr('class', 'card-content');
    var ratingImg = $('<img>').attr('src', rating);
    var distanceP = $('<p>').attr('class','distance').html('<i class="material-icons tiny">location_on</i> ' + distance + "mi")
    //assembling
    cardImgDiv.append(img);
    cardContentDiv.append(newH2).append(ratingImg).append(distanceP);
    cardStackedDiv.append(cardContentDiv);
    cardDiv.append(cardImgDiv).append(cardStackedDiv)
    colDiv.append(cardDiv);
    $('#yelpContent').append(colDiv);
}
function createCollectionItem(userImg, name, years, distance) {
    // console.log('inside function')
    // console.log("image: " + userImg + " and name: " + name);
    //<li> parent
    var newLi = $('<li>');
    newLi.attr('class', "collection-item avatar");
    //Image
    var newImg = $('<img>')
    newImg.attr('src', '/uploads/images/' + userImg)
    newImg.attr('class', 'circle');
    //TITLE
    var span = $('<span>');
    span.attr('class', 'title');
    span.html(name);
    //icon link
    var link = $('<a>')
    link.attr({
        href: "#",
        id: "chosenUser",
        class: "secondary-content",
        "data-name": name,
        "data-img": userImg 
    });
    //link
    var icon = $('<i>')
    icon.attr('class', 'material-icons')
    icon.html("forum");
    //<p>
    var newP1 = $('<p>');
    newP1.html("Years of Experience: " + years);
    //distance
    var newP2 = $('<p>').html('<i class="material-icons">directions_car</i>  ' + distance)

    link.append(icon);
    newLi.append(newImg);
    newLi.append(span);
    newLi.append(newP1);
    newLi.append(newP2);
    newLi.append(link);
    $('#matchContentInsert').append(newLi);
}

//=======================GOOGLE MAPS API STUFF===========================
                // var mapOptions = {
                //     zoom:10,
                //     center: new google.maps.LatLng(29.7604,-95.3698),
                //     mapTypeControlOptions: {
                //         mapTypeIds: ['roadmap','styled_map']
                //       }
                // }
                // var map = new google.maps.Map(document.getElementById('map'), mapOptions);
                // var styledMapType = new google.maps.StyledMapType(
                //         [
                //           {
                //             "elementType": "geometry",
                //             "stylers": [
                //               {
                //                 "color": "#ebe3cd"
                //               }
                //             ]
                //           },
                //           {
                //             "elementType": "labels.text.fill",
                //             "stylers": [
                //               {
                //                 "color": "#523735"
                //               }
                //             ]
                //           },
                //           {
                //             "elementType": "labels.text.stroke",
                //             "stylers": [
                //               {
                //                 "color": "#f5f1e6"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "administrative",
                //             "elementType": "geometry.stroke",
                //             "stylers": [
                //               {
                //                 "color": "#c9b2a6"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "administrative.land_parcel",
                //             "elementType": "geometry.stroke",
                //             "stylers": [
                //               {
                //                 "color": "#dcd2be"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "administrative.land_parcel",
                //             "elementType": "labels.text.fill",
                //             "stylers": [
                //               {
                //                 "color": "#ae9e90"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "landscape.natural",
                //             "elementType": "geometry",
                //             "stylers": [
                //               {
                //                 "color": "#dfd2ae"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "poi",
                //             "elementType": "geometry",
                //             "stylers": [
                //               {
                //                 "color": "#dfd2ae"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "poi",
                //             "elementType": "labels.text.fill",
                //             "stylers": [
                //               {
                //                 "color": "#93817c"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "poi.park",
                //             "elementType": "geometry.fill",
                //             "stylers": [
                //               {
                //                 "color": "#a5b076"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "poi.park",
                //             "elementType": "labels.text.fill",
                //             "stylers": [
                //               {
                //                 "color": "#447530"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "road",
                //             "elementType": "geometry",
                //             "stylers": [
                //               {
                //                 "color": "#f5f1e6"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "road.arterial",
                //             "elementType": "geometry",
                //             "stylers": [
                //               {
                //                 "color": "#fdfcf8"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "road.highway",
                //             "elementType": "geometry",
                //             "stylers": [
                //               {
                //                 "color": "#f8c967"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "road.highway",
                //             "elementType": "geometry.stroke",
                //             "stylers": [
                //               {
                //                 "color": "#e9bc62"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "road.highway.controlled_access",
                //             "elementType": "geometry",
                //             "stylers": [
                //               {
                //                 "color": "#e98d58"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "road.highway.controlled_access",
                //             "elementType": "geometry.stroke",
                //             "stylers": [
                //               {
                //                 "color": "#db8555"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "road.local",
                //             "elementType": "labels.text.fill",
                //             "stylers": [
                //               {
                //                 "color": "#806b63"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "transit.line",
                //             "elementType": "geometry",
                //             "stylers": [
                //               {
                //                 "color": "#dfd2ae"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "transit.line",
                //             "elementType": "labels.text.fill",
                //             "stylers": [
                //               {
                //                 "color": "#8f7d77"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "transit.line",
                //             "elementType": "labels.text.stroke",
                //             "stylers": [
                //               {
                //                 "color": "#ebe3cd"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "transit.station",
                //             "elementType": "geometry",
                //             "stylers": [
                //               {
                //                 "color": "#dfd2ae"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "water",
                //             "elementType": "geometry.fill",
                //             "stylers": [
                //               {
                //                 "color": "#b9d3c2"
                //               }
                //             ]
                //           },
                //           {
                //             "featureType": "water",
                //             "elementType": "labels.text.fill",
                //             "stylers": [
                //               {
                //                 "color": "#92998d"
                //               }
                //             ]
                //           }
                //         ],
                //         {name: 'Styled Map'});
                // map.mapTypes.set('styled_map', styledMapType);
                // map.setMapTypeId('styled_map');
                // for (var i = 0; i < yelpResponse.features.length; i++) {
                //   var coords = yelpResponse.features[i].geometry.coordinates;
                //   var latLng = new google.maps.LatLng(coords[1],coords[0]);
                //   var marker = new google.maps.Marker({
                //     position: latLng,
                //     map: map
                //   });
                // }
                //=======================END GOOGLE MAPS API STUFF===========================