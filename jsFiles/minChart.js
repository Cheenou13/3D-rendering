import * as echarts from 'echarts';

/* <script type="module" src="../jsFiles/localCampus.js"></script>
<script type="module" src="../jsFiles/minChart.js"></script> */

/* <div class="naviagtion-dropdown bg-blue-900 rounded-lg py-1 text-white box-shadow bg-opacity-80 ">
<a class="block px-2 text text-left transition-all text-base " 
      id="back-to-soq" href="http://10.20.128.102:3000/index.html">L10</a>
<a class="block px-2 text text-left transition-all text-base" 
      id="view-campus" href="http://10.20.128.102:3000/navigation-pages/global.html">Global Network</a>
<a class="block px-2 text text-left transition-all text-base" 
      id="view-globe" href="https://showroom.littleworkshop.fr/" target="_blank">Future Implmentation</a>
</div> */

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
