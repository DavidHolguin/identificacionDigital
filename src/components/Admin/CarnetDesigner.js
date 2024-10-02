import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import axios from 'axios';

const CarnetDesigner = () => {
  const [design, setDesign] = useState({
    backgroundColor: '#ffffff',
    textColor: '#000000',
    logoUrl: '',
    headerText: 'Carnet Digital',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleColorChange = (color, type) => {
    setDesign({ ...design, [type]: color.hex });
  };

  const handleInputChange = (e) => {
    setDesign({ ...design, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('/api/admin/carnet-design/', design);
      setSuccess('Diseño de carnet guardado exitosamente');
    } catch (err) {
      setError('Error al guardar el diseño del carnet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Diseñador de Carnets</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Color de fondo</label>
          <SketchPicker
            color={design.backgroundColor}
            onChangeComplete={(color) => handleColorChange(color, 'backgroundColor')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Color de texto</label>
          <SketchPicker
            color={design.textColor}
            onChangeComplete={(color) => handleColorChange(color, 'textColor')}
          />
        </div>

        <div>
          <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">
            URL del logo
          </label>
          <input
            type="text"
            name="logoUrl"
            id="logoUrl"
            value={design.logoUrl}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="headerText" className="block text-sm font-medium text-gray-700">
            Texto del encabezado
          </label>
          <input
            type="text"
            name="headerText"
            id="headerText"
            value={design.headerText}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{success}</div>}

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Guardando...' : 'Guardar diseño'}
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Vista previa del carnet</h3>
        <div
          style={{
            backgroundColor: design.backgroundColor,
            color: design.textColor,
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>{design.headerText}</h4>
          {design.logoUrl && <img src={design.logoUrl} alt="Logo" style={{ maxWidth: '100px', marginBottom: '10px' }} />}
          <p>Nombre: Juan Pérez</p>
          <p>ID: 12345</p>
          <p>Tipo de membresía: Premium</p>
        </div>
      </div>
    </div>
  );
};

export default CarnetDesigner;