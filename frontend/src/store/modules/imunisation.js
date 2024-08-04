// store/modules/Immunisation.js

import ImmunisationService from "../../service/imunisation";

const state = {
  immunisations: [], // Array to store immunisation records
  immunisation: null, // Single immunisation record for detailed view/edit
  paginationImmunisation: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const mutations = {
  setImmunisations(state, immunisations) {
    state.immunisations = immunisations;
  },
  setPaginationImmunisation(state, paginationImmunisation) {
    state.paginationImmunisation = paginationImmunisation;
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
  async fetchImmunisations({ commit }, params) {
    try {
      const response = await ImmunisationService.getAll(params);
      const { data, pagination } = response;
      commit("setImmunisations", data);
      commit("setPaginationImmunisation", pagination);
      return response;
    } catch (error) {
      console.error("Error fetching immunisations:", error);
    }
  },
  async exportDataImunisation({ commit }, month) {
    try {
      const [year, monthIndex] = month.split("-");
      const monthName = new Date(`${year}-${monthIndex}-01`).toLocaleString(
        "id-ID",
        { month: "long" }
      );
      const formattedMonth = `${monthName} ${year}`;

      const data = await ImmunisationService.exportImunisationData(month);
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Laporan Data Imunisasi pada ${formattedMonth}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Terjadi kesalahan saat mengunduh data.");
    }
  },
  async exportDataSample({ commit }) {
    try {
      const data = await ImmunisationService.exportImunisationDataSample();
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `LaporanBulananKesehatan.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Error exporting data. Please try again later.");
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
      const response = await ImmunisationService.updateData(
        id,
        immunisationData
      );
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
  paginationImmunisation: (state) => state.paginationImmunisation,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
