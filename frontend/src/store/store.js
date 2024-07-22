import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import children from "./modules/children";
import mother from "./modules/mother";
import birth from "./modules/birth";
import imunisation from "./modules/imunisation";
import motherGrowth from "./modules/motherGrowth";
import childrenGrowth from "./modules/childrenGrowth";
import user from "./modules/user";
import article from "./modules/article";
const store = createStore({
  modules: {
    auth,
    children,
    mother,
    birth,
    imunisation,
    motherGrowth,
    childrenGrowth,
    user,
    article,
  },
  plugins: [createPersistedState()],
});

export default store;
