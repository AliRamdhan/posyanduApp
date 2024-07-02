import AuthService from "../../service/auth";

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
      const { token } = await AuthService.login(email, password);
      commit("setToken", token);
      const response = await AuthService.getProfile();
      const data = response.data;
      commit("setUser", data);
      return { token, data };
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
  async fetchProfile({ commit }) {
    try {
      const response = await AuthService.getProfile();
      commit("setUser", response.data);
      return response.data;
    } catch (error) {
      commit("clearAuthData");
      throw new Error("Failed to fetch user profile");
    }
  },
  logout({ commit }) {
    commit("clearAuthData");
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  user: (state) => state.user,
  // role: (state) => (state.user ? state.user : null),
};

export default {
  state,
  mutations,
  actions,
  getters,
};
