import axios from "axios";
import userService from "../../service/user";
const state = {
  users: [],
  usersAll: [],
  userone: null,
  error: null,
  paginationUsersAll: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  setUsersAll(state, usersAll) {
    state.usersAll = usersAll;
  },
  setPaginationUsersAll(state, paginationUsersAll) {
    state.paginationUsersAll = paginationUsersAll;
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
      commit("setUsers", response);
    } catch (error) {
      commit("setError", error.response.data);
    }
  },
  async fetchUserAll({ commit }, params) {
    try {
      const response = await userService.getAllUser(params);
      const { data, pagination } = response;
      commit("setUsersAll", data);
      commit("setPaginationUsersAll", pagination);
      return response.data;
    } catch (error) {
      console.error("Error fetching children:", error);
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
  usersAll: (state) => state.usersAll,
  paginationUsersAll: (state) => state.paginationUsersAll,
  error: (state) => state.error,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
