import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const SubscriptionPlans = () => {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (plan) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/suscripciones/create/', { plan });
      // Actualizar el usuario con la nueva información de suscripción
      await login(user.username, user.password);
      alert(`Te has suscrito exitosamente al plan ${plan}`);
    } catch (err) {
      setError('Error al procesar la suscripción. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-center">
        Planes de Suscripción
      </h2>
      
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
        <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
          <div className="p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Básico</h3>
            <p className="mt-4 text-sm text-gray-500">
              Acceso a funciones básicas del carnet digital
            </p>
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900">$9.99</span>
              <span className="text-base font-medium text-gray-500">/mes</span>
            </p>
            <button
              onClick={() => handleSubscribe('basico')}
              disabled={loading}
              className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
            >
              {loading ? 'Procesando...' : 'Suscribirse'}
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
          <div className="p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Premium</h3>
            <p className="mt-4 text-sm text-gray-500">
              Acceso completo a todas las funciones premium
            </p>
            <p className="mt-8">
              <span className="text-4xl font-extrabold text-gray-900">$19.99</span>
              <span className="text-base font-medium text-gray-500">/mes</span>
            </p>
            <button
              onClick={() => handleSubscribe('premium')}
              disabled={loading}
              className="mt-8 block w-full bg-indigo-600 border border-indigo-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-700"
            >
              {loading ? 'Procesando...' : 'Suscribirse'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;