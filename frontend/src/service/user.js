import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/user`;

class UserService {
  async getAll() {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching all data:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data with id ${id}:`, error);
      throw error;
    }
  }

  async updateData(id, data) {
    try {
      const data = await axios.put(`${API_URL}/${id}`, data);
      return data;
    } catch (error) {
      console.error(`Error updating data with id ${id}:`, error);
      throw error;
    }
  }

  async deleteData(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting data with id ${id}:`, error);
      throw error;
    }
  }
}

export default new UserService();