// modules/mother.js
import axios from "axios";

const state = {
  mothers: [],
  pagination: {
    page: 1,
    limit: 2,
    total: 0,
  },
  searchName: "",
  searchHusband: "",
  searchDob: "",
  searchKS: "",
  searchBPJS: null,
};

const getters = {
  mothers: (state) => state.mothers, // Getter for mothers data
  totalPages: (state) =>
    Math.ceil(state.pagination.total / state.pagination.limit),
};

const mutations = {
  SET_MOTHERS(state, mothers) {
    state.mothers = mothers;
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination;
  },
  SET_SEARCH_NAME(state, name) {
    state.searchName = name;
  },
  SET_SEARCH_HUSBAND(state, husband) {
    state.searchHusband = husband;
  },
  SET_SEARCH_DOB(state, dob) {
    state.searchDob = dob;
  },
  SET_SEARCH_KS(state, ks) {
    state.searchKS = ks;
  },
  SET_SEARCH_BPJS(state, bpjs) {
    state.searchBPJS = bpjs;
  },
};

const actions = {
  async fetchMothers({ commit, state }) {
    try {
      const response = await axios.get("http://localhost:9000/api/v1/mother", {
        params: {
          page: state.pagination.page,
          limit: state.pagination.limit,
          name: state.searchName,
          husband: state.searchHusband,
          dob: state.searchDob,
          KS: state.searchKS,
          bpjs: state.searchBPJS,
        },
      });
      const { data, pagination } = response.data;
      commit("SET_MOTHERS", data);
      commit("SET_PAGINATION", pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error appropriately, e.g., show a message to the user
    }
  },
  async updatePagination({ commit, dispatch }, { page, limit }) {
    commit("SET_PAGINATION", { page, limit });
    await dispatch("fetchMothers");
  },
  // Add more actions as needed
};

export default {
  state,
  getters,
  mutations,
  actions,
};
