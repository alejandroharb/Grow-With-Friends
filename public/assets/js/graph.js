$(document).ready(function() {
$('.collapsible').collapsible();

// on window load, userName from window path, golf is initial activity
var userName = window.location.pathname.slice(10);
console.log("window path username: " + userName);
var activityModal = "golf";
var data = [];
var dataIndex = 2;
var chartTitle = "Score Timeline";
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

           // default dataIndex shows score
    //
    $('.cummulative').on('click', function(e) {
        e.preventDefault();
        activityModal = $(this).data("activity");
        dataIndex = 3;
        chartTitle = "Cummulative Score";
        plotIt();
        });
    //
    $('.dayCreated').on('click', function(e) {
        e.preventDefault();
        activityModal = $(this).data("activity");
        chartTitle = "Score Timeline";
        dataIndex = 2;
        plotIt();
        });




  //==================Generate Graph==================
    function plotIt() {
    // clear canvas
    $(".chartDiv").empty();
    $("." + activityModal + 'ChartDiv').append('<canvas class="chartArea" height="350" width="400"></canvas>');
    $('.collapsible').collapsible();
    var url = '/get-data/' + activityModal + '/' + userName;
    console.log("this is the URL: " + url)

    // retrieve data abd generate graph
    $.get(url, function(response) {
        var data = response;
        console.log(data[0]); // labels/values x-axis
        console.log(data[1]); // activity
        console.log(data[2]); // score
        console.log(data[3]); // cummulative
        console.log(data[4]); // empty labels for x-axis

    dataDisplay = data[dataIndex];

    var ctx = $(".chartArea");
    var bars_config = {
        type: 'line',
        data: {
            labels: data[4],
            datasets: [
              {
                type: "line",
              label: data[1],
              data: dataDisplay,
              fill: false,
              // backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",                // line color
              // borderCapStyle: 'butt',                  // end of line style: butt, round or square
              // borderDash: [2, 2],                              // dashed line [line, gap] : [5,10]
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(200,192,225,1)",
              pointBackgroundColor: "#fff",
              // pointBorderWidth: 1,
              // pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              // pointHoverBorderWidth: 2,
              pointRadius: 2,
              pointHitRadius: 10,
              spanGaps: false,
              borderWidth: 1
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: chartTitle
        },
          scales: {
            yAxes: [{
              ticks: {
                    beginAtZero:true
                },
              scaleLabel: {
                display: true,
                labelString: 'score'
              }
            }],
            xAxes: [{
              ticks: {
                    beginAtZero:true
                },
              scaleLabel: {
                display: true,
                labelString: 'date'
              }
            }]
          }
        }
    } // end bars config

// Chart.defaults.global.elements.rectangle.backgroundColor = 'rgba(0,0,0,1)';
// Chart.defaults.global.animation.easing = 'easeInBounce';

    var myChart = new Chart(ctx, bars_config);
});
} // end plotIt

});
