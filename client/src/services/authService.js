import api from './api';

export const login = async (email, password, tipo) => {
  const response = await api.post('/login', {
    email,
    password,
    tipo,
  });
  return response.data;
};
