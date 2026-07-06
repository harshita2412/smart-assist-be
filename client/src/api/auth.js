import { api } from './client';

export function register({ username, email, password }) {
  return api.post('/api/users/register', { username, email, password });
}

export function login({ email, password }) {
  return api.post('/api/users/login', { email, password });
}
