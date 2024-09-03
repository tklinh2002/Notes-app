import api from './http';

export const login = (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};

export const signup = (name: string, email: string, password: string) => {
  return api.post('/auth/signup', { name, email, password });
};

export const logout = () => {
  return api.post('/auth/logout');
};