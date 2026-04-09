import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface User {
  email: string;
  name?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(`${API_BASE}/login`, {
      email,
      password,
    });
    return response.data;
  },

  async signup(name: string, email: string, password: string): Promise<void> {
    await axios.post(`${API_BASE}/signup`, {
      name,
      email,
      password,
    });
  },

  setToken(token: string) {
    localStorage.setItem('token', token);
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
