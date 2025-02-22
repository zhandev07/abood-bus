import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

import "font-awesome/css/font-awesome.min.css";
import "./assets/css/main.css";
import "./assets/css/animate.css";
import "./assets/css/astro-animation.css";
import "./assets/css/prettyPhoto.css";
import "./assets/css/responsive.css";
import "./assets/css/templatemo-style.css";

import "./assets/css/result_searchbar.css";
import AOS from "aos";
import "aos/dist/aos.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");

AOS.init({
  duration: 800,
  once: true,
});
