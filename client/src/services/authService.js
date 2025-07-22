import api from './api';

export const login = async (email, senha) => {
  const response = await api.post('/api/admins', {
    email,
    senha,
  });
  return response.data;
};
