import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Se ha eliminado el interceptor que añadía el token a las solicitudes

// Servicios de autenticación
export const auth = {
  login: (username, password) => api.post('/auth/login/', { username, password }),
  register: (userData) => api.post('/auth/register/', userData),
  resetPassword: (email) => api.post('/auth/reset-password/', { email }),
  changePassword: (oldPassword, newPassword) => api.post('/auth/change-password/', { old_password: oldPassword, new_password: newPassword }),
};

// Servicios de usuario
export const user = {
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (userData) => api.put('/auth/profile/', userData),
};

// Servicios de carnet
export const carnet = {
  getCarnet: () => api.get('/carnets/detail/'),
  validateCarnet: (id) => api.get(`/carnets/validate/${id}/`),
};

// Servicios de suscripción
export const subscription = {
  getPlans: () => api.get('/subscriptions/plans/'),
  subscribe: (planId) => api.post('/subscriptions/subscribe/', { plan_id: planId }),
  cancelSubscription: () => api.post('/subscriptions/cancel/'),
};

// Servicios de administración
export const admin = {
  getUsers: () => api.get('/admin/users/'),
  updateUserStatus: (userId, isActive) => api.patch(`/admin/users/${userId}/`, { is_active: isActive }),
  updateCarnetDesign: (designData) => api.post('/admin/carnet-design/', designData),
};

export default api;