<template>
  <div id="app">
    <AppHeader v-if="meta.showHeader" />
    <router-view />
    <AppFooter v-if="meta.showFooter" />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    meta() {
      return this.$route.meta;
    },
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff !important;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color: black !important;
}
</style>
