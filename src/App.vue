<template>
  <div class="container">
    <div style="margin-bottom: 12px;">
      <Echarts :xAxis="xAxis" :series="series"/>
    </div>
    <div style="display: flex;width: 100%;">
      <div style="flex:1" >
        <input type="button" value="hubble => json" />
        <JsonEditor style="width: 100%;" :language="'json'" @onCodeChange="onJsonChange"></JsonEditor>
      </div>
      <div style="flex:1;margin-left: 12px;">
        <input type="button" value="json => chart" @click="runCode"/>
        <JsonEditor style="width: 100%;" @onCodeChange="onFunctionChange" :codes="'//请输入处理逻辑\n//使用 $origin 获取左边数据'"></JsonEditor>
      </div>
      
    </div>
    <div @click="runCode">测试</div>
  </div>
</template>

<script>
import JsonEditor from './components/Editor.vue';
import Echarts from './components/Charts.vue';
export default {
  components: {
    JsonEditor,
    Echarts
  },
  data: () => ({
    json: '',
    functionEval: `(() => {\n$function\n})()`,
    functionStr: '',
    xAxis: [],
    series: []
  }),
  methods: {
    onJsonChange(json) {
      this.json = json
    },
    onFunctionChange(functionStr) {
      this.functionStr = functionStr
      if(typeof functionStr === 'string' && this.functionStr.split) {
        functionStr.split('$origin').join(this.json)
      }
    },
    // functionEval: `(() => {\nconst origin=$json\n$function\n})()`,
    runCode() {
      let _functionEval = `${this.functionEval}`
      // _functionEval = _functionEval.replace('$json', this.json)
      _functionEval = _functionEval.replace('$function', this.functionStr)
      const isOriginIn =  _functionEval.split('$origin').length > 1
      _functionEval =isOriginIn ? _functionEval.split('$origin').join(this.json):_functionEval
      const result = (eval(_functionEval))
      this.xAxis = result.xAxis
      this.series = result.series
    }
  }

}
</script>


<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  height: 100%;
  width: 100%;
}
</style>
