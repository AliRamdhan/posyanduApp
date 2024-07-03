// store/modules/childrenGrowth.js

import ChildrenGrowthService from "../../service/childrenGrowth";

const state = {
  childrensGrowth: [],
  childBadutas: [],
  childBaduta: null,
};

const mutations = {
  setChildrenBaduta(state, childrensGrowth) {
    state.childrensGrowth = childrensGrowth;
  },
  setChildBaduta(state, childBadutas) {
    state.childBadutas = childBadutas;
  },
  setChild(state, childBaduta) {
    state.childBaduta = childBaduta;
  },
  addChild(state, childBaduta) {
    state.childrensGrowth.push(childBaduta);
  },
  updateChild(state, updatedChild) {
    const index = state.childrensGrowth.findIndex(
      (child) => child._id === updatedChild._id
    );
    if (index !== -1) {
      state.childrensGrowth.splice(index, 1, updatedChild);
    }
  },
  deleteChild(state, id) {
    state.childrensGrowth = state.childrensGrowth.filter((child) => child._id !== id);
  },
};

const actions = {
  async fetchChildrenBadutas({ commit }) {
    try {
      const response = await ChildrenGrowthService.getAll();
      commit("setChildrenBaduta", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching children:", error);
    }
  },
  async fetchChildrenBaduta({ commit }) {
    try {
      const response = await ChildrenGrowthService.getAll();
      commit("setChildBaduta", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching children:", error);
    }
  },
  async fetchChildBaduta({ commit }, id) {
    try {
      const response = await ChildrenGrowthService.getById(id);
      commit("setChild", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching child with id ${id}:`, error);
    }
  },
  async createChildBaduta({ commit }, childData) {
    try {
      const response = await ChildrenGrowthService.createData(childData);
      commit("addChild", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating child:", error);
    }
  },
  async updateChildBaduta({ commit }, { id, childData }) {
    try {
      const response = await ChildrenGrowthService.updateData(id, childData);
      commit("updateChild", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating data with id ${id}:`, error);
    }
  },
  async deleteChildBaduta({ commit }, id) {
    try {
      await ChildrenGrowthService.deleteData(id);
      commit("deleteChild", id);
    } catch (error) {
      console.error(`Error deleting data with id ${id}:`, error);
    }
  },
  // Ensure addChild action is defined
  async addChildBaduta({ commit }, childData) {
    try {
      const response = await ChildrenGrowthService.createData(childData);
      commit("addChild", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding data:", error);
    }
  },
};

const getters = {
  childrensGrowth: (state) => state.childrensGrowth,
  childBadutas: (state) => state.childBaduta,
  childBaduta: (state) => state.child,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
