import apiClient from './axios';

// Define types for your data
export interface User {
  id: string;
  email: string;
  name?: string;
  // add other fields
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export const api = {
  // Test connection
  test: () => apiClient.get('/api/v1/test'),

  // Users
  register: (data: RegisterData) =>
    apiClient.post<User>('/users/register', data),

  login: (credentials: LoginCredentials) =>
    apiClient.post<{ token: string; user: User }>('/users/login', credentials),

  getUsers: () => apiClient.get<User[]>('/users'),

  getUser: (id: string) => apiClient.get<User>(`/users/${id}`),

  getUserByEmail: (email: string) =>
    apiClient.get<User>(`/users/email/${email}`),

  updateUser: (id: string, data: Partial<User>) =>
    apiClient.patch<User>(`/users/${id}`, data),

  deleteUser: (id: string) => apiClient.delete(`/users/${id}`),
};
