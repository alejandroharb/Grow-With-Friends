$(document).ready(function() {

// on window load, userName from window path, golf is initial activity
var userName = window.location.pathname.slice(10);
console.log("window path username: " + userName);
var activityModal = "golf";
var data = [];
plotIt();

//==================SCORE MODAL==================
// they are all opening same modal on-click, did not change original id="golfModal" yet
$('#golfScoreBtn').on('click', function(e) {
    e.preventDefault();
    activityModal = "";
    activityModal = "golf";
    $('#golfModal').modal('open');
});
$('#guitarScoreBtn').on('click', function(e) {
    e.preventDefault();
    activityModal = "";
    activityModal = "guitar";
    $('#golfModal').modal('open');
});
$('#langScoreBtn').on('click', function(e) {
    e.preventDefault();
    activityModal = "";
    activityModal = "lang";
    $('#golfModal').modal('open');
});

//==================Submit Activity Score==================
$('#submitGolfScore').on('click', function(e) {
    e.preventDefault();

    //collect variables with data
    var score = $('#golfScore').val();
    // var userName = $('#userName').val().trim();
    var data = {
        score: score,
        username: userName
    }
    // console.log(data)
    // console.log("activityModal: " + activityModal);

    // filter data by activity type
    if (activityModal == "golf") {
        var url = '/score/golf';
    } else if (activityModal == "guitar") {
        var url = '/score/guitar';
    } else {
        var url = '/score/lang';
    }

    plotIt();
    $.post(url, data, function(response) {
        console.log("posted" + response);
    })
})

//==================Get Activity at Graph Activity Request==================
// filtering thorugh class getChartData
$('.getChartData').on('click', function(e) {
    e.preventDefault();
    // userName = $('#user-name').attr('value');
    activityModal = $(this).data("activity");
    // console.log("graph activityModal: " + activityModal);
    plotIt();
    });

  //==================Generate Graph==================
    function plotIt() {
    // clear canvas
    $("#chartDiv").empty();
    $('#chartDiv').append('<canvas id="chartArea" height="400" width="400"></canvas>');

    var url = '/get-data/' + activityModal + '/' + userName;
    console.log("this is the URL: " + url)

    // retrieve data abd generate graph
    $.get(url, function(response) {
        var data = response;
        console.log(data[0]);
        console.log(data[1]);
        console.log(data[2]);

    var ctx = $("#chartArea");
    var bars_config = {
        type: 'line',
        data: {
            labels: data[0],
            datasets: [{
              label: data[1],
              data: data[2]
            }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'score'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'date'
              }
            }]
          }
        }
    } // end bars config

    var myChart = new Chart(ctx, bars_config);
});
} // end plotIt

});
