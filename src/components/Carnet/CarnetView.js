import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../contexts/AuthContext'; // Asumiendo que tienes un contexto de autenticación

const CarnetView = () => {
  const [carnetData, setCarnetData] = useState(null);
  const { user, token } = useAuth(); // Obtén el token del contexto de autenticación

  useEffect(() => {
    // Función para obtener los datos del carnet
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
    return <div>Cargando datos del carnet...</div>;
  }

  return (
    <div className="carnet-view">
      <h2>Tu Carnet Digital</h2>
      <div className="carnet-details">
        <p>Nombre: {carnetData.name}</p>
        <p>Rol: {carnetData.role}</p>
        <p>Fecha de expiración: {carnetData.expirationDate}</p>
      </div>
      <div className="qr-code">
        <QRCodeSVG value={JSON.stringify(carnetData)} size={256} />
      </div>
    </div>
  );
};

export default CarnetView;
