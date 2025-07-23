import api from './api';

export const getAllTreinos = async () => {
  const response = await api.get('/api/treinos');
  return response.data;
};

export const getTreinoById = async (id) => {
  const response = await api.get(`/api/treinos/${id}`);
  return response.data;
};

export const getTreinosByCliente = async (clienteId) => {
  const response = await api.get(`/api/treinos/cliente/${clienteId}`);
  return response.data;
};

export const createTreino = async (treino) => {
  const response = await api.post('/api/treinos', treino);
  return response.data;
};

export const updateTreino = async (id, treino) => {
  const response = await api.put(`/api/treinos/${id}`, treino);
  return response.data;
};

export const deleteTreino = async (id) => {
  const response = await api.delete(`/api/treinos/${id}`);
  return response.data;
};
