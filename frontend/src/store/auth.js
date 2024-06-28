import AuthService from "../service/auth";

const state = {
  user: null,
  token: localStorage.getItem("token") || "",
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  clearAuthData(state) {
    state.user = null;
    state.token = "";
    localStorage.removeItem("token");
  },
};

const actions = {
  async register({ commit }, userData) {
    try {
      const user = await AuthService.register(userData);
      commit("setUser", user);
      return user;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
  async login({ commit }, { email, password }) {
    try {
      const { token, user } = await AuthService.login(email, password);
      commit("setUser", user);
      commit("setToken", token);
      return { token, user };
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
  logout({ commit }) {
    commit("clearAuthData");
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  user: (state) => state.user,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
