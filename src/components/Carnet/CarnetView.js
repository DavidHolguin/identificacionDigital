import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../contexts/AuthContext'; // Asumiendo que tienes un contexto de autenticación

const CarnetView = () => {
  const [carnetData, setCarnetData] = useState(null);
  const { user } = useAuth(); // Obtén el usuario actual del contexto de autenticación

  useEffect(() => {
    // Función para obtener los datos del carnet
    const fetchCarnetData = async () => {
      try {
        // Aquí deberías hacer una llamada a tu API para obtener los datos del carnet
        // Por ejemplo:
        // const response = await fetch(`/api/carnet/${user.id}`);
        // const data = await response.json();
        // setCarnetData(data);

        // Por ahora, usaremos datos de ejemplo
        setCarnetData(JSON.stringify({
          id: '12345',
          name: user.name,
          role: 'Estudiante',
          expirationDate: '2025-12-31'
        }));
      } catch (error) {
        console.error('Error al obtener los datos del carnet:', error);
      }
    };

    if (user) {
      fetchCarnetData();
    }
  }, [user]);

  if (!carnetData) {
    return <div>Cargando datos del carnet...</div>;
  }

  return (
    <div className="carnet-view">
      <h2>Tu Carnet Digital</h2>
      <div className="carnet-details">
        <p>Nombre: {JSON.parse(carnetData).name}</p>
        <p>Rol: {JSON.parse(carnetData).role}</p>
        <p>Fecha de expiración: {JSON.parse(carnetData).expirationDate}</p>
      </div>
      <div className="qr-code">
        <QRCodeSVG value={carnetData} size={256} />
      </div>
    </div>
  );
};

export default CarnetView;