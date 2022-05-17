import * as echarts from 'echarts';
import _CAPMUS_DATA from '../../jasonFiles/LocalCampusData.json'



// const _SALES = _GLOBAL_DATA.global_location[3].sales
const _MONTH = _CAPMUS_DATA.monthly_produced[0].months
const _SALES = _CAPMUS_DATA.monthly_produced[0].data
console.log("month: ", _MONTH, "sales: ", _SALES)
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
    // data: _PRODUCTIVITY,
    type: 'category',
    axisTick: {
      alignWithLabel: true
    },
    axisLabel: {
      rotate: 30
    },
    data: _MONTH
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
            data: _SALES
        }]
    })
});
