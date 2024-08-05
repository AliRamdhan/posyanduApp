import MotherService from "../../service/motherGrowth";

const state = {
  motherGrowths: [],
  motherPregnant: [],
  motherGrowthByMom: [],
  motherGrowth: null,
  paginationMotherGrowth: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const mutations = {
  setMotherGrowths(state, motherGrowths) {
    state.motherGrowths = motherGrowths;
  },
  setMotherGrowthsByMom(state, motherGrowthByMom) {
    state.motherGrowthByMom = motherGrowthByMom;
  },
  setPaginationMothersGrowth(state, paginationMotherGrowth) {
    state.paginationMotherGrowth = paginationMotherGrowth;
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
  async fetchMotherGrowths({ commit }, params) {
    try {
      const response = await MotherService.getAll(params);
      const { data, pagination } = response;
      commit("setMotherGrowths", data);
      commit("setPaginationMothersGrowth", pagination);
      return response.data;
    } catch (error) {
      console.error("Error fetching children:", error);
    }
  },
  async fetchMotherPregnants({ commit }) {
    try {
      const response = await MotherService.getPregnant();
      commit("setMotherPregnant", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching motherGrowths:", error);
    }
  },
  async fetchMotherGrowthbyMom({ commit }, motherId) {
    try {
      const response = await MotherService.getByMom(motherId);
      commit("setMotherGrowthsByMom", response.data);
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
  async exportDataMotherGrowth({ commit }, month) {
    try {
      const [year, monthIndex] = month.split("-");
      const monthName = new Date(`${year}-${monthIndex}-01`).toLocaleString(
        "id-ID",
        { month: "long" }
      );
      const formattedMonth = `${monthName} ${year}`;

      const data = await MotherService.exportGrowthIbuData(month);
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Laporan Data Perkembangan Ibu pada ${formattedMonth}.xlsx`;
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
  motherGrowths: (state) => state.motherGrowths,
  motherPregnant: (state) => state.motherPregnant,
  motherGrowth: (state) => state.motherGrowth,
  paginationMotherGrowth: (state) => state.paginationMotherGrowth,
  motherGrowthByMom: (state) => state.motherGrowthByMom,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
