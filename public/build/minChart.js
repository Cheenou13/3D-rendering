import * as echarts from '../../node_modules/echarts';
import _GLOBAL_DATA from '../../jasonFiles/GlobeData.json' assert {type: 'json'}
console.log(_GLOBAL_DATA.global_location)

const _PRODUCTIVITY = _GLOBAL_DATA.global_location[3].yearly_productivity
const _SALES = _GLOBAL_DATA.global_location[3].sales
const _PAST = _GLOBAL_DATA.global_location[3].past_year
// initialize the echarts instance
var myChart = echarts.init(document.getElementById('chartDaily'));
const option = {
  xAxis: {
    type: 'time',
    name: 'sales time'
  },
  yAxis: {
    type: 'y',
    name: 'y axis'
  }
}
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
    data: _PRODUCTIVITY,
    // axisLabel: {
      
    //   formatter: '{value} kg',
    //   align: 'center'
    //   // ...
    // }
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
      data: _SALES,
      color: 'rgb(255,255,255)',
    }
  ],
});
myChart.on('click', function(params) {
    console.log(params.name);
    myChart.setOption({
        series: [{
            data: _PAST
        }]
    })
});
