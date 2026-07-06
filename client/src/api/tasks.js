import { api } from './client';

export function getTasks() {
  return api.get('/api/tasks');
}

export function createTask(task) {
  return api.post('/api/tasks', task);
}

export function updateTask(id, updates) {
  return api.put(`/api/tasks/${id}`, updates);
}

export function deleteTask(id) {
  return api.delete(`/api/tasks/${id}`);
}
