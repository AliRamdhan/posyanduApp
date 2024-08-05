// store/modules/childrenGrowth.js

import ChildrenGrowthService from "../../service/childrenGrowth";

const state = {
  childrensGrowth: [],
  childBadutaGrowth: null,
  childGrowth: [],
  paginationChildrensGrowth: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const mutations = {
  setChildrenGrowth(state, childrensGrowth) {
    state.childrensGrowth = childrensGrowth;
  },
  setPaginationChildrensGrowth(state, paginationChildrensGrowth) {
    state.paginationChildrensGrowth = paginationChildrensGrowth;
  },
  setChildGrowth(state, childGrowth) {
    state.childGrowth = childGrowth;
  },
  setChild(state, childBadutaGrowth) {
    state.childBadutaGrowth = childBadutaGrowth;
  },
  addChild(state, childBadutaGrowth) {
    state.childrensGrowth.push(childBadutaGrowth);
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
      commit("setChildrenGrowth", data);
      commit("setPaginationChildrensGrowth", pagination);
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
  async fetchGrowthChildren({ commit }, childId) {
    try {
      const response = await ChildrenGrowthService.getByChildren(childId);
      commit("setChildGrowth", response.data);
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
  async exportDataChildGrowth({ commit }, month) {
    try {
      const [year, monthIndex] = month.split("-");
      const monthName = new Date(`${year}-${monthIndex}-01`).toLocaleString(
        "id-ID",
        { month: "long" }
      );
      const formattedMonth = `${monthName} ${year}`;

      const data = await ChildrenGrowthService.exportBirthData(month);
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Laporan Data Perkembangan Anak pada ${formattedMonth}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Terjadi kesalahan saat mengunduh data.");
    }
  },
};

const getters = {
  childrensGrowth: (state) => state.childrensGrowth,
  childGrowth: (state) => state.childGrowth,
  childBadutaGrowth: (state) => state.childBadutaGrowth,
  paginationChildrensGrowth: (state) => state.paginationChildrensGrowth,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
