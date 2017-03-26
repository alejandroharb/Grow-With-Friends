$(document).ready(function () {
    //=================GETTING MATCHED===================
    $('#getMatchedBtn').on('click', function () {
        var username = $('#user_name').attr('value');
        $.ajax({
            url: '/crafts/match/options/' + username,
            method: 'GET'
        }).then(function (response) {
            $('#craftOptionsModal').empty();
            $('#craftOptionsModal').append(response);
            $('.modal').modal();
        }).then(function () {
            $('#getMatchedModal').modal('open');
        })
    })
    //-------matched user chosen for CHATTING---------
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
})

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

function handleMatching(craft) {
    $('#preloaderInsert').addClass('progress');
    var username = $('#user_name').attr('value');
    var url = "/match/" + craft + "/" + username;
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
            createCollectionItem(image, name, years, dist)
        };
        // //=====YELP API=====
        var yelpURL = '/api/yelp';
        var yelpData = { address: yelpAddress }
        $.post(yelpURL, yelpData, function (yelpResponse) {
            //collect yelp data
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
}