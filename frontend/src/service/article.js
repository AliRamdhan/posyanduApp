import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/article`;

class ArticleService {
  async getAll(params) {
    try {
      const response = await axios.get(`${API_URL}`, { params });
      if (response.data && response.data.data && response.data.pagination) {
        return {
          data: response.data.data,
          pagination: response.data.pagination,
        };
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching all data:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(`${API_URL}/id/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data with id ${id}:`, error);
      throw error;
    }
  }

  async getBySlug(slug) {
    try {
      const response = await axios.get(`${API_URL}/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data with slug ${slug}:`, error);
      throw error;
    }
  }

  async createData(data) {
    try {
      const response = await axios.post(`${API_URL}/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating data:", error);
      throw error;
    }
  }

  async updateData(id, data) {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating data with id ${id}:`, error);
      throw error;
    }
  }

  async deleteData(id) {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting data with id ${id}:`, error);
      throw error;
    }
  }
}

export default new ArticleService();
