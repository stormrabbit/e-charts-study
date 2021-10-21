<template>
  <div class="container">
    <JsonEditor v-model="code"></JsonEditor>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import JsonEditor from './components/Editor.vue';

const code = ref('');
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>
