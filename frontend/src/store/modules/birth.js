// store/modules/birth.js

import BirthService from "../../service/birth";

const state = {
  births: [],
  birth: null,
};

const mutations = {
  setBirths(state, births) {
    state.births = births;
  },
  setBirth(state, birth) {
    state.birth = birth;
  },
  addBirth(state, birth) {
    state.births.push(birth);
  },
  updateBirth(state, updatedBirth) {
    const index = state.births.findIndex(
      (birth) => birth._id === updatedBirth._id
    );
    if (index !== -1) {
      state.births.splice(index, 1, updatedBirth);
    }
  },
  deleteBirth(state, id) {
    state.births = state.births.filter((birth) => birth._id !== id);
  },
};

const actions = {
  async fetchBirths({ commit }) {
    try {
      const response = await BirthService.getAll();
      commit("setBirths", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching births:", error);
    }
  },
  async fetchBirth({ commit }, id) {
    try {
      const response = await BirthService.getById(id);
      commit("setBirth", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching birth with id ${id}:`, error);
    }
  },
  async createBirth({ commit }, birthData) {
    try {
      const response = await BirthService.createData(birthData);
      commit("addBirth", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating birth:", error);
    }
  },
  async updateBirth({ commit }, { id, birthData }) {
    try {
      const response = await BirthService.updateData(id, birthData);
      commit("updateBirth", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating birth with id ${id}:`, error);
    }
  },
  async deleteBirth({ commit }, id) {
    try {
      await BirthService.deleteData(id);
      commit("deleteBirth", id);
    } catch (error) {
      console.error(`Error deleting birth with id ${id}:`, error);
    }
  },
};

const getters = {
  births: (state) => state.births,
  birth: (state) => state.birth,
};

export default {
  state,
  mutations,
  actions,
  getters,
};