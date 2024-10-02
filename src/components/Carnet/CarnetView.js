import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../contexts/AuthContext'; // Asumiendo que tienes un contexto de autenticación

const CarnetView = () => {
  const [carnetData, setCarnetData] = useState(null);
  const { user, token } = useAuth(); // Obtén el token del contexto de autenticación

  useEffect(() => {
    const fetchCarnetData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/carnets/${user.id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Enviar el token en los headers
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!response.ok) {
          throw new Error('Error al obtener los datos del carnet');
        }

        const data = await response.json();
        setCarnetData(data);
      } catch (error) {
        console.error('Error al obtener los datos del carnet:', error);
      }
    };

    if (user && token) {
      fetchCarnetData();
    }
  }, [user, token]);

  if (!carnetData) {
    return <div className="flex justify-center items-center min-h-screen">Cargando datos del carnet...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <div className="mb-4">
          <img
            src="https://via.placeholder.com/100" // Imagen de perfil de ejemplo
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full mx-auto mb-3"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{carnetData.name}</h2>
          <p className="text-gray-600">{carnetData.role}</p>
        </div>
        <div className="text-left mb-4">
          <p className="text-sm text-gray-700"><strong>ID:</strong> {carnetData.id}</p>
          <p className="text-sm text-gray-700"><strong>Fecha de expiración:</strong> {carnetData.expirationDate}</p>
        </div>
        <div className="mt-4">
          <QRCodeSVG value={JSON.stringify(carnetData)} size={128} />
        </div>
      </div>
    </div>
  );
};

export default CarnetView;
