import MotherService from "../../service/motherGrowth";

const state = {
  motherGrowths: [],
  motherPregnant: [],
  motherGrowth: null,
};

const mutations = {
  setMotherGrowths(state, motherGrowths) {
    state.motherGrowths = motherGrowths;
  },
  setMotherPregnant(state, motherPregnant) {
    state.motherPregnant = motherPregnant;
  },
  setMotherGrowth(state, motherGrowth) {
    state.motherGrowth = motherGrowth;
  },
  addMotherGrowth(state, motherGrowth) {
    state.motherGrowths.push(motherGrowth);
  },
  updateMotherGrowth(state, updatedMotherGrowth) {
    const index = state.motherGrowths.findIndex(
      (motherGrowth) => motherGrowth._id === updatedMotherGrowth._id
    );
    if (index !== -1) {
      state.motherGrowths.splice(index, 1, updatedMotherGrowth);
    }
  },
  deleteMotherGrowth(state, id) {
    state.motherGrowths = state.motherGrowths.filter(
      (motherGrowth) => motherGrowth._id !== id
    );
  },
};

const actions = {
  async fetchMotherGrowths({ commit }) {
    try {
      const response = await MotherService.getAll();
      commit("setMotherGrowths", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching motherGrowths:", error);
    }
  },
  async fetchMotherPregnants({ commit }) {
    try {
      const response = await MotherService.getPregnant();
      console.log(response.data);
      commit("setMotherPregnant", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching motherGrowths:", error);
    }
  },
  async fetchMotherGrowth({ commit }, id) {
    try {
      const response = await MotherService.getById(id);
      commit("setMotherGrowth", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching motherGrowth with id ${id}:`, error);
    }
  },
  async createMotherGrowth({ commit }, motherGrowthData) {
    try {
      const response = await MotherService.createData(motherGrowthData);
      commit("addMotherGrowth", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating motherGrowth:", error);
    }
  },
  async updateMotherGrowth({ commit }, { id, motherGrowthData }) {
    try {
      const response = await MotherService.updateData(id, motherGrowthData);
      commit("updateMotherGrowth", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating motherGrowth with id ${id}:`, error);
    }
  },
  async deleteMotherGrowth({ commit }, id) {
    try {
      await MotherService.deleteData(id);
      commit("deleteMotherGrowth", id);
    } catch (error) {
      console.error(`Error deleting motherGrowth with id ${id}:`, error);
    }
  },
};

const getters = {
  motherGrowths: (state) => state.motherGrowths,
  motherPregnant: (state) => state.motherPregnant,
  motherGrowth: (state) => state.motherGrowth,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
