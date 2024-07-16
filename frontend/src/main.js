import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store/store";
import router from "./router/index";
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net";
import "../node_modules/datatables.net-dt/css/dataTables.dataTables.css";
import "../node_modules/flowbite-vue/dist/index.css";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faCalendar,
  faMagnifyingGlass,
  faCloudArrowDown,
  faCloudArrowUp,
  faAngleDown,
  faPersonPregnant,
  faChild,
  faPersonBreastfeeding,
  faHeart,
  faSyringe,
  faUtensils,
  faGraduationCap,
  faStethoscope,
  faAt,
  faUser,
  faChildDress,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faUserSecret,
  faCalendar,
  faMagnifyingGlass,
  faCloudArrowDown,
  faCloudArrowUp,
  faAngleDown,
  faPersonPregnant,
  faChild,
  faPersonBreastfeeding,
  faHeart,
  faSyringe,
  faUtensils,
  faGraduationCap,
  faStethoscope,
  faAt,
  faUser,
  faChildDress,
  faBars,
  faXmark
);

DataTable.use(DataTablesLib);
const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);
app.use(store);

app.mount("#app");
