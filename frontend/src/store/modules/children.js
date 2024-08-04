import ChildrenService from "../../service/children";
import { calculateAge } from "../../utils/CalcurateAvg";

const state = {
  childrens: [],
  children: [],
  childrenMom: [],
  childBaduta: [],
  childBalita: [],
  child: null,
  paginationChild: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const setStatus = async (child) => {
  const age = calculateAge(child.dob);
  let isUpdated = false;

  if (age.years > 2 || (age.years === 2 && age.months >= 1)) {
    if (!child.isBalita || child.isBaduta) {
      child.isBalita = true;
      child.isBaduta = false;
      isUpdated = true;
    }
  } else {
    if (child.isBalita || !child.isBaduta) {
      child.isBalita = false;
      child.isBaduta = true;
      isUpdated = true;
    }
  }

  if (isUpdated) {
    try {
      await ChildrenService.updateData(child._id, child);
    } catch (error) {
      console.error(
        `Error updating status for child with id ${child._id}:`,
        error
      );
    }
  }
};

const mutations = {
  setChildrens(state, childrens) {
    state.childrens = childrens;
  },
  setChildren(state, children) {
    children.forEach((child) => setStatus(child));
    state.children = children;
  },
  setChildrenMom(state, childrenMom) {
    state.childrenMom = childrenMom;
  },
  setChildrenBaduta(state, childBaduta) {
    state.childBaduta = childBaduta;
  },
  setChildrenBalita(state, childBalita) {
    state.childBalita = childBalita;
  },
  setPaginationChild(state, paginationChild) {
    state.paginationChild = paginationChild;
  },
  setChild(state, child) {
    setStatus(child);
    state.child = child;
  },
  addChild(state, child) {
    setStatus(child);
    state.children.push(child);
  },
  updateChild(state, updatedChild) {
    setStatus(updatedChild);
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
  async fetchChildrenAll({ commit }) {
    try {
      const response = await ChildrenService.getAll();
      commit("setChildrens", response.data);
      return response;
    } catch (error) {
      console.error("Error fetching mothers:", error);
    }
  },
  async fetchChildren({ commit }, params) {
    try {
      const response = await ChildrenService.getAllChildrens(params);
      const { data, pagination } = response;
      commit("setChildren", data);
      commit("setPaginationChild", pagination);
      return response.data;
    } catch (error) {
      console.error("Error fetching children:", error);
    }
  },
  async fetchChildrenMom({ commit }, motherId) {
    try {
      const response = await ChildrenService.getAllByMom(motherId);
      commit("setChildrenMom", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching child with id ${motherId}:`, error);
    }
  },
  async fetchChildrenBaduta({ commit }) {
    try {
      const response = await ChildrenService.getAllBaduta();
      commit("setChildrenBaduta", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching child:", error);
    }
  },
  async fetchChildrenBalita({ commit }) {
    try {
      const response = await ChildrenService.getAllBalita();
      commit("setChildrenBalita", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching child:", error);
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
      throw new Error(error.response.data.message);
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
  async addChild({ commit }, childData) {
    try {
      const response = await ChildrenService.createData(childData);
      commit("addChild", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding data:", error);
    }
  },
  async exportDataChildren({ commit }, month) {
    try {
      const [year, monthIndex] = month.split("-");
      const monthName = new Date(`${year}-${monthIndex}-01`).toLocaleString(
        "id-ID",
        { month: "long" }
      );
      const formattedMonth = `${monthName} ${year}`;

      const data = await ChildrenService.exportData(month);
      if (data.size === 0) {
        console.error("No data found for the selected month");
        alert("No data found for the selected month");
        return;
      }
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Laporan Data Anak pada ${formattedMonth}.xlsx`;
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
  childrens: (state) => state.childrens,
  children: (state) => state.children,
  childrenMom: (state) => state.childrenMom,
  childBaduta: (state) => state.childBaduta,
  childBalita: (state) => state.childBalita,
  child: (state) => state.child,
  paginationChild: (state) => state.paginationChild,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
