import api from './api';

export const loginAdmin = async (email) => {
  const response = await api.post('/api/admins/login', {
    email,
  });
  return response.data;
};

export const loginCliente = async (email) => {
  const response = await api.post('/api/clientes/login', {
    email,
  });
  return response.data;
};

export const login = async (email, tipo) => {
  if (tipo === 'administrativo') {
    return await loginAdmin(email);
  } else {
    return await loginCliente(email);
  }
};

// Funções de armazenamento
export const saveUserData = (userData, userType) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('userType', userType);
};

export const getUserData = () => {
  const user = localStorage.getItem('user');
  const userType = localStorage.getItem('userType');
  return user ? { user: JSON.parse(user), userType } : null;
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('userType');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};

export const isAdmin = () => {
  return localStorage.getItem('userType') == "administrativo";
}

export const isCliente = () => {
  return localStorage.getItem('userType') == "cliente";
}
