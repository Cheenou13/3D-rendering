import Chart from 'chart.js/auto';

export function makeSideChart (){
    const div = document.getElementById('sideWall-canvas').getContext('2d')

    const pluginService = {
        beforeDraw: (chart, easing) =>{
            // console.log(easing)
            if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor){
                // console.log(chart.config.options.chartArea.backgroundColor)
                var ctx = chart.ctx
                var chartArea = chart.chartArea
                ctx.fillStyle = chart.config.options.chartArea.backgroundColor
                ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top)
                ctx.restore()
            }
        }
    }
    const legendLine = {
        legend: {
            labels: {
                color: 'rgba(200, 255, 255, 1)'
            }
        }
    }
    const dataSets = {
        label: 'Monthly Products Sold (x10000)',
        data: [12, 19, 3, 5, 2, 3, 10, 5, 13, 7, 20, 15],
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 255, 255, 1)',
            'rgba(200, 162, 200, 1)',
            'rgba(255, 3, 86, 1)',
            'rgba(255, 192, 192, 1)',
            'rgba(153, 255, 255, 1)',
            'rgba(255, 255, 64, 1)'
        ],
        // borderColor: [
        //      'rgba(255, 99, 132, 1)',
        //      'rgba(54, 162, 235, 1)',
        //      'rgba(255, 206, 86, 1)',
        //      'rgba(75, 192, 192, 1)',
        //     'rgba(153, 102, 255, 1)',
        //     'rgba(255, 159, 64, 1)'
        // ],
        borderColor: 'rgba(200, 255, 255, 1)',
        borderWidth: 2,
        tension: 0.4
    }

    var configChart = {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'November', 'October', 'December' 
                    ],
            datasets: [dataSets]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    ticks: {
                        color: 'rgba(200, 255, 255, 1)'
                    },
                    beginAtZero: true,
                    // grid: {display: true}
                },
                x: {
                    ticks: {
                        color: 'rgba(200, 255, 255, 1)'
                    },
                    grid:{ display: true }
                }
            },
            responsive: true,
            chartArea: {
                backgroundColor: 'rgba(75, 103, 120, 0.3)'
            },
            plugins:legendLine
        },
        plugins:[pluginService],   
    }
    new Chart (div, configChart)

}

// makeSideChart()
