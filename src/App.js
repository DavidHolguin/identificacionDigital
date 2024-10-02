import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Importar componentes
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResetPassword from './components/Auth/ResetPassword';
import UserProfile from './components/User/UserProfile'; // Cambiado de Profile a UserProfile
import Dashboard from './components/User/Dashboard';
import UserManagement from './components/Admin/UserManagement';
import CarnetDesigner from './components/Admin/CarnetDesigner';
import CarnetView from './components/Carnet/CarnetView';
import CarnetValidator from './components/Carnet/CarnetValidator';
import SubscriptionPlans from './components/Subscription/SubscriptionPlans';
// PaymentForm ha sido eliminado

// Componente para rutas protegidas
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// Componente para rutas de admin
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.is_staff ? children : <Navigate to="/dashboard" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Rutas protegidas */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            <Route path="/carnet" element={<PrivateRoute><CarnetView /></PrivateRoute>} />
            <Route path="/subscription" element={<PrivateRoute><SubscriptionPlans /></PrivateRoute>} />
            {/* La ruta de PaymentForm ha sido eliminada */}
            
            {/* Rutas de admin */}
            <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
            <Route path="/admin/carnet-designer" element={<AdminRoute><CarnetDesigner /></AdminRoute>} />
            
            {/* Ruta pública para validar carnets */}
            <Route path="/validate" element={<CarnetValidator />} />
            
            {/* Redirigir a dashboard si la ruta no existe */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;