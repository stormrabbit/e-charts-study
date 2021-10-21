<template>
  <div class="echarts-box">
    <div id="myEcharts" :style="{ width: '900px', height: '300px' }"></div>
    <div></div>
  </div>
</template>

<script lang="js">
import * as echarts from "echarts";
import {onMounted, onUnmounted} from 'vue'
import {getResult} from '../../mockjson/api.js'
import {getUploadResult} from '../../mockjson/upload.js'
import {getView} from '../../mockjson/view.js'
import {getTools} from '../../mockjson/getTools.js'
import dayjs from 'dayjs'
const chartsResult = getResult()
const uploadResult = getUploadResult()
const tools = getTools()
const view = getView()
console.log(chartsResult)
console.log(uploadResult)
console.log(view)
console.log(tools)
const getThisYear = () => {
  let index = 0
  const _year = []
  while (dayjs('2021-01-01').add(index, 'day').isBefore('2021-10-20', 'day')) {
    const currentDate = dayjs('2021-01-01').add(index, 'day')
    _year.push(currentDate.format('YYYY-MM-DD'))
    index ++
    if(index > 365) {
      break
    }
  }
  return _year
}
getThisYear()

export default {
  name: "echartsBox",
  setup() {
    /// 声明定义一下echart
    let echart = echarts;

    onMounted(() => {
      initChart();
    });

    onUnmounted(() => {
      echart.dispose;
    });
	
    // 基础配置一下Echarts
    function initChart() {
      let chart = echart.init(document.getElementById("myEcharts"), "dark");
      // const dates = chartsResult.dates
      // const results = chartsResult.results
      
      // 把配置和数据放这里
      chart.setOption({
        xAxis: {
          type: "category",
          data: tools.dates
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: tools.add_mains,
            type: "line",
            smooth: true,
            color: 'green'
          },
          {
             data: tools.update_mains,
            type: "line",
            smooth: true,
            color: 'red'
          },
               {
             data: tools.add_channels,
            type: "line",
            smooth: true,
            color: 'blue'
          },
               {
             data: tools.update_channels,
            type: "line",
            smooth: true,
            color: 'orange'
          },
          {
             data: tools.batch_update_channels,
            type: "line",
            smooth: true,
            color: 'yellow'
          }
        ]
      });
      window.onresize = function() {
        //自适应大小
        chart.resize();
      };
    }

    return { initChart };
  },
};
</script>

<style lang="css" scoped>


img{
  width: 400px;
  height: 400px;
}
.chart-box{
  width: 600px;
  height: 600px;
}
</style>