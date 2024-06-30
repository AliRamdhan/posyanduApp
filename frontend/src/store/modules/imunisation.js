// store/modules/Immunisation.js

import ImmunisationService from "../../service/imunisation";

const state = {
  immunisations: [], // Array to store immunisation records
  immunisation: null, // Single immunisation record for detailed view/edit
};

const mutations = {
  setImmunisations(state, immunisations) {
    state.immunisations = immunisations;
  },
  setImmunisation(state, immunisation) {
    state.immunisation = immunisation;
  },
  addImmunisation(state, immunisation) {
    state.immunisations.push(immunisation);
  },
  updateImmunisation(state, updatedImmunisation) {
    const index = state.immunisations.findIndex(
      (immunisation) => immunisation._id === updatedImmunisation._id
    );
    if (index !== -1) {
      state.immunisations.splice(index, 1, updatedImmunisation);
    }
  },
  deleteImmunisation(state, id) {
    state.immunisations = state.immunisations.filter(
      (immunisation) => immunisation._id !== id
    );
  },
};

const actions = {
  async fetchImmunisations({ commit }) {
    try {
      const response = await ImmunisationService.getAll();
      commit("setImmunisations", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching immunisations:", error);
    }
  },
  async fetchImmunisation({ commit }, id) {
    try {
      const response = await ImmunisationService.getById(id);
      commit("setImmunisation", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching immunisation with id ${id}:`, error);
    }
  },
  async createImmunisation({ commit }, immunisationData) {
    try {
      const response = await ImmunisationService.createData(immunisationData);
      commit("addImmunisation", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating immunisation:", error);
    }
  },
  async updateImmunisation({ commit }, { id, immunisationData }) {
    try {
      const response = await ImmunisationService.updateData(id, immunisationData);
      commit("updateImmunisation", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating immunisation with id ${id}:`, error);
    }
  },
  async deleteImmunisation({ commit }, id) {
    try {
      await ImmunisationService.deleteData(id);
      commit("deleteImmunisation", id);
    } catch (error) {
      console.error(`Error deleting immunisation with id ${id}:`, error);
    }
  },
};

const getters = {
  immunisations: (state) => state.immunisations,
  immunisation: (state) => state.immunisation,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
