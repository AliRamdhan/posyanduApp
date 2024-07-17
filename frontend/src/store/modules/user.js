import axios from "axios";
import userService from "../../service/user";
const state = {
  users: [],
  userone: null,
  error: null,
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  setUserOne(state, userone) {
    state.userone = userone;
  },
  updateUser(state, updatedUser) {
    const index = state.users.findIndex(
      (userone) => userone._id === updatedUser._id
    );
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  deleteUser(state, id) {
    state.users = state.users.filter((user) => user._id !== id);
  },
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      const response = await userService.getAll();
      // console.log("dwdwq", response);
      commit("setUsers", response);
    } catch (error) {
      commit("setError", error.response.data);
    }
  },
  async fetchUserOne({ commit }, id) {
    try {
      const response = await userService.getById(id);
      commit("setUserOne", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching immunisation with id ${id}:`, error);
    }
  },
  async updateUser({ commit }, { id, userData }) {
    try {
      const response = await userService.updateData(id, userData);
      commit("updateUser", response.data);
    } catch (error) {
      commit("setError", error.response.data);
    }
  },
  async deleteUser({ commit }, id) {
    try {
      await userService.deleteData(id);
      commit("deleteUser", id);
    } catch (error) {
      commit("setError", error.response.data);
    }
  },
};

const getters = {
  users: (state) => state.users,
  userone: (state) => state.userone,
  error: (state) => state.error,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
