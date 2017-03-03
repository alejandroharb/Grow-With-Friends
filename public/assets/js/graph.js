$(document).ready(function() {
$('.collapsible').collapsible();

// on window load, userName from window path, golf is initial activity
var userName = window.location.pathname.slice(10);
console.log("window path username: " + userName);
var activityModal = "golf";
var data = [];
var dataIndex = 3;    // default dataIndex shows score
var chartTitle = "Score Timeline";
var chartType = "line";
var labelString = ""
var colorArray = [];
var sixShades = [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(232, 143, 71, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
                  ]

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
    var data = {
        score: score,
        username: userName
    }

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
    activityModal = $(this).data("activity");
    plotIt();
    });

    $('.cummulative').on('click', function(e) {
        e.preventDefault();
        activityModal = $(this).data("activity");
        dataIndex = 3;
        chartType = "line";
        chartTitle = "Cummulative Score";
        plotIt();
        });
    //
    $('.dayCreated').on('click', function(e) {
        e.preventDefault();
        activityModal = $(this).data("activity");
        chartTitle = "Score Timeline";
        chartType = "bar";
        dataIndex = 2;
        plotIt();
        });


  //==================Generate Graph==================
    function plotIt() {
    // clear canvas
    $(".chartDiv").empty();
    $("." + activityModal + 'ChartDiv').append('<canvas class="chartArea" height="350" width="400"><img src="/assets/img/aharb.jpg"></canvas>');
    $('.collapsible').collapsible();
    var url = '/get-data/' + activityModal + '/' + userName;
    console.log("this is the URL: " + url);

    // retrieve data and generate graph
    $.get(url, function(response) {
        var data = response;

    // color cycling for bars
    var dataPoints = data[0].length;
    var cycleIndex = 1;
    var countIndex = 0;
    for (var i=0; i<dataPoints; i++) {
        colorArray.push(sixShades[Math.abs(countIndex)]);
        countIndex += cycleIndex;
        console.log("countIndex: " + countIndex);
        if (Math.abs(countIndex) >= 5) { cycleIndex *= -1}

    }

    // axis labels selection according to activity
    if (activityModal == "golf") {
      labelString = "Score";
      chartType = "line";
      dataIndex = 3; 
    } else {
      labelString = "Practice Hours";
    }

    dataDisplay = data[dataIndex];

    var ctx = $(".chartArea");
    var bars_config = {
        type: chartType,
        data: {
            labels: data[4],
            datasets: [
              {
                label: data[1],
                data: dataDisplay,
                lineTension: 0.4,
                fill: false,
                // backgroundColor: "rgba(75,192,192,0.4)",
                backgroundColor: colorArray,
                borderColor: "rgba(75,192,192,1)",                // line color
                pointBorderColor: "rgba(200,192,225,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointRadius: 2,
                borderWidth: 1
              }
            ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: false,
            text: chartTitle
          },
          scales: {
            yAxes: [{
              ticks: {
                    beginAtZero:true
                },
              scaleLabel: {
                display: true,
                labelString: labelString
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

// Chart.defaults.global.defaultFontFamily = ;
Chart.defaults.global.legend.display = false;
Chart.defaults.global.responsiveAnimationDuration = 1000;
Chart.defaults.global.defaultFontColor = "blue";
Chart.defaults.global.defaultFontSize = 14;
var myChart = new Chart(ctx, bars_config);
$( ".chartarea" ).fadeIn( 3000 );
});
} // end plotIt

});
