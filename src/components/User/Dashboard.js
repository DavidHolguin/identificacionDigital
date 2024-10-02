import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [carnet, setCarnet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarnet = async () => {
      try {
        const response = await axios.get('/api/carnets/detail/');
        setCarnet(response.data);
      } catch (err) {
        setError('Error al cargar el carnet');
      } finally {
        setLoading(false);
      }
    };

    fetchCarnet();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Cargando...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Bienvenido, {user.first_name}</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      {carnet && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Tu Carnet Digital
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Tipo de membresía
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {carnet.membership_type}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Código QR
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <img src={carnet.qr_code} alt="Código QR" className="w-32 h-32" />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;