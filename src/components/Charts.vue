<template>
  <div class="echarts-box">
    <div id="myEcharts" :style="{ width: '100%', height: '500px' }"></div>
    <div @click="setChart">test</div>
  </div>
</template>

<script lang="js">
import * as echarts from "echarts";
import {onMounted, onUnmounted} from 'vue'

let _instance = null
export default {
  name: "echartsBox",
  props: {
    xAxis: {
      type: Array,
      default: () => []
    },
    series: {
      type: Array,
      default: () => []
    }
  },
  data:() => ({}),
  methods: {
    setChart(xAxis, series){
        const _series = series.map(serie => ({
          data: serie,
          type: "line",
          smooth: true
        }))
      const option = {
        xAxis: {
          type: "category",
          data: xAxis
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value"
        },
        series: _series
      }
      setTimeout(() => {
        try {
            _instance.setOption(option, true)
        } catch (error) {
          console.log(error)
        }
        
      }, 500);


    }
  },
  watch: {
    series: {
      handler (newSeries) {
        if(!!newSeries && newSeries.length) {
          this.setChart(this.xAxis, this.series)
        }
        
      },
      deep: true,
      immediate: true
    }
  },
  setup() {
    /// 声明定义一下echart
    onMounted(() => {
      initChart();
    });

    onUnmounted(() => {
      _instance.dispose;
    });
	
    // 基础配置一下Echarts
    function initChart() {
      _instance = echarts.init(document.getElementById("myEcharts"), "dark");
      if(_instance) {
      // 把配置和数据放这里
      _instance.setOption({
        xAxis: {
          type: "category",
          data: []
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value"
        },
        series: []
      });
      window.onresize = function() {
        //自适应大小
        if(_instance) {
                setTimeout(() => {
        try {
                _instance.resize();
        } catch (error) {
          console.log(error)
        }
        
      }, 500);
       
        }    
      };
    }

      
    }

    return { initChart };
  },
  
};
</script>

<style lang="css" scoped>
img {
  width: 400px;
  height: 400px;
}
.chart-box {
  width: 600px;
  height: 600px;
}
</style>