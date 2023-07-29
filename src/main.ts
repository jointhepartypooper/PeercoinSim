import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { addIcons } from "oh-vue-icons";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import {
  BiTrash3,
  FcProcess,
  PxBriefcaseUpload,
  CoSave,
  CoArrowThickLeft,
  CoArrowThickRight,
  CoChartLine,
} from "oh-vue-icons/icons";
addIcons(
  BiTrash3,
  FcProcess,
  PxBriefcaseUpload,
  CoSave,
  CoArrowThickLeft,
  CoArrowThickRight,
  CoChartLine
);
const app = createApp(App);
app.use(Toast);
app.use(createPinia());
app.use(router);

app.mount("#app");
