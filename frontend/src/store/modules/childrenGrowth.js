// store/modules/childrenGrowth.js

import ChildrenGrowthService from "../../service/childrenGrowth";

const state = {
  childrensGrowth: [],
  childBadutas: [],
  childBaduta: null,
  childGrowth: [],
  paginationChildrensGrowth: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const mutations = {
  setChildrenBaduta(state, childrensGrowth) {
    state.childrensGrowth = childrensGrowth;
  },
  setPaginationChildrensGrowth(state, paginationChildrensGrowth) {
    state.paginationChildrensGrowth = paginationChildrensGrowth;
  },
  setChildBaduta(state, childBadutas) {
    state.childBadutas = childBadutas;
  },
  setChildGrowth(state, childGrowth) {
    state.childGrowth = childGrowth;
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
    state.childrensGrowth = state.childrensGrowth.filter(
      (child) => child._id !== id
    );
  },
};

const actions = {
  async fetchChildrenBadutas({ commit }, params) {
    try {
      const response = await ChildrenGrowthService.getAll(params);
      const { data, pagination } = response;
      commit("setChildrenBaduta", data);
      commit("setPaginationChildrensGrowth", pagination);
      return response.data;
    } catch (error) {
      console.error("Error fetching children:", error);
    }
  },
  // async fetchChildrenBadutas({ commit }) {
  //   try {
  //     const response = await ChildrenGrowthService.getAll();
  //     const { data, pagination } = response;
  // commit("setChildrenBaduta", data);
  // commit("setPaginationChildrensGrowth", pagination);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching children:", error);
  //   }
  // },
  async fetchChildrenBaduta({ commit }) {
    try {
      const response = await ChildrenGrowthService.getAll();
      commit("setChildBaduta", response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching children:", error);
    }
  },
  async fetchGrowthChildren({ commit }, childId) {
    try {
      const response = await ChildrenGrowthService.getByChildren(childId);
      commit("setChildGrowth", response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching children:", error);
    }
  },
  async fetchChildrenBaduta({ commit }) {
    try {
      const response = await ChildrenGrowthService.getAll();
      commit("setChildBaduta", response.data);
      console.log(response.data);
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
  childGrowth: (state) => state.childGrowth,
  childBaduta: (state) => state.child,
  paginationChildrensGrowth: (state) => state.paginationChildrensGrowth,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
