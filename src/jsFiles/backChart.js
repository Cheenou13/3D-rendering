import Chart from 'chart.js/auto';


export function makeBackChart (){
    const div = document.getElementById('threeD-canvas')

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
        label: '# of Votes',
        data: [0, 12, 19, 3, 5, 2, 3],
        backgroundColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
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
        type: 'line',
        data: {
            labels: ['undecided', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [dataSets]
        },
        options: {
            maintainAspectRatio: false,
            // onResize:
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

// makeBackChart()