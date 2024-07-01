// store/index.js

import ChildrenService from "../../service/childrenGrowth";

const state = {
  children: [],
  childBaduta: [],
  child: null,
};

const mutations = {
  setChildren(state, children) {
    state.children = children;
  },
  setChildBaduta(state, childBaduta) {
    state.childBaduta = childBaduta;
  },
  setChild(state, child) {
    state.child = child;
  },
  addChild(state, child) {
    state.children.push(child);
  },
  updateChild(state, updatedChild) {
    const index = state.children.findIndex(
      (child) => child._id === updatedChild._id
    );
    if (index !== -1) {
      state.children.splice(index, 1, updatedChild);
    }
  },
  deleteChild(state, id) {
    state.children = state.children.filter((child) => child._id !== id);
  },
};

const actions = {
  async fetchChildren({ commit }) {
    try {
      const response = await ChildrenService.getAll();
      commit("setChildren", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching children:", error);
    }
  },
  async fetchChildrenBaduta({ commit }) {
    try {
      const response = await ChildrenService.getAll();
      commit("setChildBaduta", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching children:", error);
    }
  },
  async fetchChild({ commit }, id) {
    try {
      const response = await ChildrenService.getById(id);
      commit("setChild", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching child with id ${id}:`, error);
    }
  },
  async createChild({ commit }, childData) {
    try {
      const response = await ChildrenService.createData(childData);
      commit("addChild", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating child:", error);
    }
  },
  async updateChild({ commit }, { id, childData }) {
    try {
      const response = await ChildrenService.updateData(id, childData);
      commit("updateChild", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating data with id ${id}:`, error);
    }
  },
  async deleteChild({ commit }, id) {
    try {
      await ChildrenService.deleteData(id);
      commit("deleteChild", id);
    } catch (error) {
      console.error(`Error deleting data with id ${id}:`, error);
    }
  },
  // Ensure addChild action is defined
  async addChild({ commit }, childData) {
    try {
      const response = await ChildrenService.createData(childData);
      commit("addChild", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding data:", error);
    }
  },
};

const getters = {
  children: (state) => state.children,
  childBaduta: (state) => state.childBaduta,
  child: (state) => state.child,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
