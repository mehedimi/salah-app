import "./style.css";
import "./sw.js"
import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount("#app");
