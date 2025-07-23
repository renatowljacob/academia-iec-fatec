import api from './api';

export const getAllAulas = async () => {
  const response = await api.get('/api/aulas');
  return response.data;
};

export const getAulaById = async (id) => {
  const response = await api.get(`/api/aulas/${id}`);
  return response.data;
};

export const createAula = async (aula) => {
  const response = await api.post('/api/aulas', aula);
  return response.data;
};

export const updateAula = async (id, aula) => {
  const response = await api.put(`/api/aulas/${id}`, aula);
  return response.data;
};

export const deleteAula = async (id) => {
  const response = await api.delete(`/api/aulas/${id}`);
  return response.data;
};
