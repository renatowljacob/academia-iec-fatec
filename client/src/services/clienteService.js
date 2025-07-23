import api from './api';

export const getAllClientes = async () => {
  const response = await api.get('/api/clientes');
  return response.data;
};

export const getClienteById = async (id) => {
  const response = await api.get(`/api/clientes/${id}`);
  return response.data;
};

export const createCliente = async (cliente) => {
  const response = await api.post('/api/clientes', cliente);
  return response.data;
};

export const updateCliente = async (id, cliente) => {
  const response = await api.put(`/api/clientes/${id}`, cliente);
  return response.data;
};

export const deleteCliente = async (id) => {
  const response = await api.delete(`/api/clientes/${id}`);
  return response.data;
};
