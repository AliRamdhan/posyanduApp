import MotherService from "../../service/mother";

const state = {
  mothers: [],
  mother: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const mutations = {
  setMothers(state, mothers) {
    state.mothers = mothers;
  },
  setPagination(state, pagination) {
    state.pagination = pagination;
  },
  setMother(state, mother) {
    state.mother = mother;
  },
  addMother(state, mother) {
    state.mothers.push(mother);
  },
  updateMother(state, updatedMother) {
    const index = state.mothers.findIndex(
      (mother) => mother._id === updatedMother._id
    );
    if (index !== -1) {
      state.mothers.splice(index, 1, updatedMother);
    }
  },
  deleteMother(state, id) {
    state.mothers = state.mothers.filter((mother) => mother._id !== id);
  },
};

const actions = {
  async fetchMothers({ commit }, params) {
    try {
      const response = await MotherService.getAll(params);
      const { data, pagination } = response;
      commit("setMothers", data);
      commit("setPagination", pagination);
      return response;
    } catch (error) {
      console.error("Error fetching mothers:", error);
    }
  },
  async exportData({ commit }, month) {
    try {
      const data = await MotherService.exportMotherData(month);
      if (data.size === 0) {
        console.error("No data found for the selected month");
        alert("No data found for the selected month");
        return;
      }
      // Perform file download
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mothers_${month}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Error exporting data. Please try again later.");
    }
  },
  async fetchMother({ commit }, id) {
    try {
      const response = await MotherService.getById(id);
      commit("setMother", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching mother with id ${id}:`, error);
    }
  },
  async createMother({ commit }, motherData) {
    try {
      const response = await MotherService.createData(motherData);
      commit("addMother", response);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error creating mother:", error);
      throw new Error(error.response.data.error);
    }
  },
  async updateMother({ commit }, { id, motherData }) {
    try {
      const response = await MotherService.updateData(id, motherData);
      commit("updateMother", response);
      return response;
    } catch (error) {
      console.error(`Error updating data with id ${id}:`, error);
    }
  },
  async deleteMother({ commit }, id) {
    try {
      await MotherService.deleteData(id);
      commit("deleteMother", id);
    } catch (error) {
      console.error(`Error deleting data with id ${id}:`, error);
    }
  },
};

const getters = {
  mothers: (state) => state.mothers,
  mother: (state) => state.mother,
  pagination: (state) => state.pagination,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
