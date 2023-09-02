import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

//animate on scroll
import "aos/dist/aos.css";
import Aos from "aos";

createApp(App).use(router).mount("#app");

//animate on scroll
Aos.init({
  duration: 800,
  easing: "ease-in-out",
});
