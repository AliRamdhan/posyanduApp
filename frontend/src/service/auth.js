import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/auth`;

class AuthService {
  async register(userData) {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  }

  async login(email, password) {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  }

  async getProfile() {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}

export default new AuthService();
