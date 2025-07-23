import api from './api';

export const getAllAgendamentos = async () => {
  const response = await api.get('/api/agendamentos');
  return response.data;
};

export const getAgendamentoById = async (id) => {
  const response = await api.get(`/api/agendamentos/${id}`);
  return response.data;
};

export const getAgendamentosByCliente = async (clienteId) => {
  const response = await api.get(`/api/agendamentos/cliente/${clienteId}`);
  return response.data;
};

export const createAgendamento = async (agendamento) => {
  const response = await api.post('/api/agendamentos', agendamento);
  return response.data;
};

export const updateAgendamento = async (id, agendamento) => {
  const response = await api.put(`/api/agendamentos/${id}`, agendamento);
  return response.data;
};

export const deleteAgendamento = async (id) => {
  const response = await api.delete(`/api/agendamentos/${id}`);
  return response.data;
};

export const markPresenca = async (id, presente) => {
  const response = await api.put(`/api/agendamentos/${id}/presenca`, { presente });
  return response.data;
};

export const getProgressStats = async (clienteId, startDate = null, endDate = null) => {
  let url = `/api/agendamentos/cliente/${clienteId}/progress`;
  const params = new URLSearchParams();
  
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  
  const response = await api.get(url);
  return response.data;
};
