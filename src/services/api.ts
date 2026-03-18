import apiClient from './axios';

// Define types for your data
export interface User {
  id: string;
  email: string;
  name?: string;
  role_id?: 1 | 2; // 1 for admin, 2 for employee
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
    apiClient.post<User>('api/v1/users/register', data),

  login: (credentials: LoginCredentials) =>
    apiClient.post<{ token: string; user: User }>(
      'api/v1/users/login',
      credentials,
    ),

  getUsers: () => apiClient.get<User[]>('api/v1/users'),

  getUser: (id: string) => apiClient.get<User>(`api/v1/users/${id}`),

  getUserByEmail: (email: string) =>
    apiClient.get<User>(`api/v1/users/email/${email}`),

  updateUser: (id: string, data: Partial<User>) =>
    apiClient.patch<User>(`api/v1/users/${id}`, data),

  deleteUser: (id: string) => apiClient.delete(`api/v1/users/${id}`),
};
