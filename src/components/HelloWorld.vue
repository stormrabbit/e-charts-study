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
import dayjs from 'dayjs'
const chartsResult = getResult()
const uploadResult = getUploadResult()
console.log(chartsResult)
console.log(uploadResult)
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
      const dates = chartsResult.dates
      const results = chartsResult.results
      // 把配置和数据放这里
      chart.setOption({
        xAxis: {
          type: "category",
          data: dates
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: results,
            type: "line",
            smooth: true
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