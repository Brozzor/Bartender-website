<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import './assets/css/styles.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: #0c1624 !important;
}
/* fige le scroll sur téléphone */
body {
  height: 100%;
  overflow: hidden;
  width: 100%;
  position: fixed;
}

</style>
