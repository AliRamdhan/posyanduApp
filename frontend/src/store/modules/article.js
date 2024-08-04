import ArticleService from "../../service/article";

const state = {
  articles: [],
  article: null,
  paginationArticle: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const mutations = {
  setArticles(state, articles) {
    state.articles = articles;
  },
  setPaginationArticle(state, paginationArticle) {
    state.paginationArticle = paginationArticle;
  },
  setArticle(state, article) {
    state.article = article;
  },
  addArticle(state, article) {
    state.articles.push(article);
  },
  updateArticle(state, updateArticle) {
    const index = state.articles.findIndex(
      (article) => article._id === updateArticle._id
    );
    if (index !== -1) {
      state.articles.splice(index, 1, updateArticle);
    }
  },
  deleteArticle(state, id) {
    state.articles = state.articles.filter((article) => article._id !== id);
  },
};

const actions = {
  async fetchArticles({ commit }, params) {
    try {
      const response = await ArticleService.getAll(params);
      const { data, pagination } = response;
      commit("setArticles", data);
      commit("setPaginationArticle", pagination);
      return response.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  },
  async fetchArticleById({ commit }, id) {
    try {
      const data = await ArticleService.getById(id);
      commit("setArticle", data);
      return data;
    } catch (error) {
      console.error(`Error fetching article with id ${id}:`, error);
    }
  },
  async fetchArticleBySlug({ commit }, slug) {
    try {
      const data = await ArticleService.getBySlug(slug);
      commit("setArticle", data);
      return data;
    } catch (error) {
      console.error(`Error fetching article with slug ${slug}:`, error);
    }
  },
  async createArticle({ commit }, articleData) {
    try {
      const response = await ArticleService.createData(articleData);
      commit("addArticle", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating article:", error);
    }
  },
  async updateArticle({ commit }, { id, articleData }) {
    try {
      const response = await ArticleService.updateData(id, articleData);
      commit("updateArticle", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error updating article with id ${id}:`, error);
    }
  },
  async deleteArticle({ commit }, id) {
    try {
      await ArticleService.deleteData(id);
      commit("deleteArticle", id);
    } catch (error) {
      console.error(`Error deleting article with id ${id}:`, error);
    }
  },
};

const getters = {
  articles: (state) => state.articles,
  article: (state) => state.article,
  paginationArticle: (state) => state.paginationArticle,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
