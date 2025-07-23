import api from './api';

export const getAllPagamentos = async () => {
  const response = await api.get('/api/pagamentos');
  return response.data;
};

export const getPagamentoById = async (id) => {
  const response = await api.get(`/api/pagamentos/${id}`);
  return response.data;
};

export const getPagamentosByCliente = async (clienteId) => {
  const response = await api.get(`/api/pagamentos/cliente/${clienteId}`);
  return response.data;
};

export const createPagamento = async (pagamento) => {
  const response = await api.post('/api/pagamentos', pagamento);
  return response.data;
};

export const updatePagamento = async (id, pagamento) => {
  const response = await api.put(`/api/pagamentos/${id}`, pagamento);
  return response.data;
};

export const deletePagamento = async (id) => {
  const response = await api.delete(`/api/pagamentos/${id}`);
  return response.data;
};
