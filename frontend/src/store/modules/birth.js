// store/modules/birth.js

import BirthService from "../../service/birth";

const state = {
  births: [],
  birth: null,
  paginationBirth: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const mutations = {
  setBirths(state, births) {
    state.births = births;
  },
  setPaginationBirth(state, paginationBirth) {
    state.paginationBirth = paginationBirth;
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
  async fetchBirths({ commit }, params) {
    try {
      const response = await BirthService.getAll(params);
      const { data, pagination } = response;
      commit("setBirths", data);
      commit("setPaginationBirth", pagination);
      return response.data;
    } catch (error) {
      console.error("Error fetching births:", error);
    }
  },
  async exportDataBirth({ commit }, month) {
    try {
      const [year, monthIndex] = month.split("-");
      const monthName = new Date(`${year}-${monthIndex}-01`).toLocaleString(
        "id-ID",
        { month: "long" }
      );
      const formattedMonth = `${monthName} ${year}`;

      const data = await BirthService.exportBirthData(month);
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Laporan Data Kelahiran pada ${formattedMonth}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Terjadi kesalahan saat mengunduh data.");
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
  paginationBirth: (state) => state.paginationBirth,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
