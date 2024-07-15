import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/imunisation`;

class ImunisationService {
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

  async exportImunisationData(month) {
    try {
      const response = await axios.get(
        `${API_URL}/export/excel?month=${month}`,
        {
          responseType: "blob", // Ensure response is treated as binary data (for file download)
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error exporting data:", error);
      throw error;
    }
  }

  async exportImunisationDataSample() {
    try {
      const response = await axios.get(`${API_URL}/export/excel/sample`, {
        responseType: "blob", // Ensure response is treated as binary data (for file download)
      });
      return response.data;
    } catch (error) {
      console.error("Error exporting data:", error);
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

  async createData(data) {
    try {
      const response = await axios.post(`${API_URL}/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating data:", error);
      throw error;
    }
  }

  async updateData(id, data) {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, data);
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

export default new ImunisationService();
