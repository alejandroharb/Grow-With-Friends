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
            for (var i = 1; i < data.length; i++) {
                var image = data[i].userImg;
                var name = data[i].user;
                var years = data[i].years;
                var dist = data[i].distance;
                // console.log(name)
                createCollectionItem(image, name, years, dist)
            };
            // //=====YELP API=====
            var yelpURL = '/api/yelp';
            var yelpData = { address: yelpAddress }
            $.post(yelpURL, yelpData, function (yelpResponse) {
                console.log(yelpResponse);
                // getGoogleMap(yelpAddress, yelpResponse)
                for (var i = 0; i < yelpResponse.length; i++) {
                    var url = yelpResponse[i].url;
                    var titleName = yelpResponse[i].name;
                    var imageLink = yelpResponse[i].image_url;
                    var rating = yelpResponse[i].rating_img_url;
                    var businessDistance = yelpResponse[i].distance * .000621;
                    businessDistance = businessDistance.toFixed(1);
                    createYelpCollection(url, titleName, imageLink, rating, businessDistance)
                }

            })
            $('#matchesModal').modal('open');
        });


    })
    $('#chosenUser').on('click', function () {
        console.log('clicked to chat')
        $('#matchesModal').modal('close');
        $('#messagingModal').modal('open');
        var name = $(this).data('name');
        var img = $(this).data('img');
        var imageElem = $('<img>').attr('src', "/uploads/images/" + img);
        var newH4 = $('<h4>').html(name)
        $('#messageUserImg').append(imageElem);
        $('#messageUserName').append(newH4);
    })
});

function createYelpCollection(url, title, imgURL, rating, distance) {
    var colDiv = $('<div>').attr('class', "col s12");
    var titleLink = $('<a>').attr({ href: url, "target": "_blank" }).html(title);
    var newH2 = $('<h2>').attr('class', 'header').html(titleLink);
    var cardDiv = $('<div>').attr('class', 'card horizontal hoverable');
    var cardImgDiv = $('<div>').attr('class', 'card-image');
    var img = $('<img>').attr('src', imgURL);
    var cardStackedDiv = $('<div>').attr('class', 'card-stacked');
    var cardContentDiv = $('<div>').attr('class', 'card-content');
    var ratingImg = $('<img>').attr('src', rating);
    var distanceP = $('<p>').attr('class', 'distance').html('<i class="material-icons tiny">location_on</i> ' + distance + "mi")
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