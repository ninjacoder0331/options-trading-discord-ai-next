import apiClient from '@/lib/axios';

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface SigninData {
  email: string;
  password: string;
}

interface AuthResponse {
  data: any;
  authToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export const authService = {
  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/signup', data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Signup failed. Please try again.');
    }
  },

  async signin(data: SigninData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/signin', data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Invalid email or password');
    }
  }
}; 