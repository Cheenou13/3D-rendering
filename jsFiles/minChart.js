import * as echarts from 'echarts';

// initialize the echarts instance
var myChart = echarts.init(document.getElementById('chartDaily'));
// Draw the chart
myChart.setOption({
  grid: {
    left: 30,
    top: 30,
    right: 10,
    bottom: 30
  },
  title: {
    text: 'Yearly Productivity (x1,000 units)',
    left: 'center',
    textStyle: {
        color: 'rgb(255,255,255)',
        fontSize: '0.75rem',
        fontWeight: 'normal',
    },
  },
  tooltip: {},
  xAxis: {
    data: ['18', '19', '20', '21', '22', '23']
  },
  yAxis: {
    
  },
  textStyle: {
    color: 'rgb(255,255,255)',
  },
  //backgroundColor: 'rgba(255,0,0,1)',
  series: [
    {
      name: 'sales',
      type: 'bar',
      data: [0, 1, 2, 2, 25, 30],
      color: 'rgb(255,255,255)',
    }
  ]
});
myChart.on('click', function(params) {
    console.log(params.name);
    myChart.setOption({
        series: [{
            data: [20, 36, 10, 10, 20, 5]
        }]
    })
});
