<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import AnalysisPage from "./components/AnalysisPage.vue";

// export default {
//   components: {
//     AnalysisPage,
//   },
// };
</script>

<template>
  <AnalysisPage></AnalysisPage>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;600;700&display=swap");

* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

#app {
  font-family: "League Spartan", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
}
</style>
