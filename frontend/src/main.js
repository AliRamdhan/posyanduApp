import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store/store";
import router from "./router/index";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
