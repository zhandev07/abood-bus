<template>
  <div id="app">
    <AppNavbar />
    <router-view />
    <AppContact />
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import AppContact from './components/AppContact.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: "App",
  components: {
    AppNavbar,
    AppContact,
    AppFooter,
  },
};
</script>

<style>
#app {
  margin: 0!important;
  padding: 0!important;
  font-family: 'Montserrat', sans-serif;
  color: #707070;
  background-color: #fff;
  overflow-x: hidden!important;
  border: 0 !important;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.router-view {
  flex: 1; 
  padding-bottom: 60px; 
  padding-top: 80px!important;
}
</style>
