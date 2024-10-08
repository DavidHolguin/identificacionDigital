import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password2) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      console.log('Intentando registrar con:', { ...formData, password: '[REDACTED]' });
      const response = await register(formData);
      console.log('Respuesta del registro:', response);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error detallado:', err);
      if (err.response) {
        console.error('Respuesta del servidor:', err.response.data);
        console.error('Código de estado:', err.response.status);
        console.error('Headers:', err.response.headers);
        
        if (err.response.data) {
          const errorMessages = Object.values(err.response.data).flat().join(', ');
          setError(`Error al registrar: ${errorMessages}`);
        } else {
          setError(`Error al registrar: ${err.response.status} ${err.response.statusText}`);
        }
      } else if (err.request) {
        console.error('No se recibió respuesta:', err.request);
        setError('Error de red. Por favor, verifica tu conexión e intenta nuevamente.');
      } else {
        console.error('Error al configurar la solicitud:', err.message);
        setError('Error inesperado. Por favor, intenta nuevamente.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img
            className="mx-auto h-24 w-auto"
            src="/logoAsobares.png"
            alt="Asobares Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear una cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Registro de Asociados
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#CF413D] focus:border-[#CF413D] focus:z-10 sm:text-sm"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#CF413D] focus:border-[#CF413D] focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="first_name"
                name="first_name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#CF413D] focus:border-[#CF413D] focus:z-10 sm:text-sm"
                placeholder="Nombre"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="last_name"
                name="last_name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#CF413D] focus:border-[#CF413D] focus:z-10 sm:text-sm"
                placeholder="Apellido"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#CF413D] focus:border-[#CF413D] focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="password2"
                name="password2"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#CF413D] focus:border-[#CF413D] focus:z-10 sm:text-sm"
                placeholder="Confirmar contraseña"
                value={formData.password2}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-[#CF413D] text-sm mt-2">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#CF413D] hover:bg-[#B93936] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CF413D]"
            >
              Registrarse
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="mt-2">
            Al continuar, aceptas nuestras{' '}
            <Link to="/privacy-policy" className="font-medium text-[#CF413D] hover:text-[#B93936]">
              políticas de privacidad
            </Link>{' '}
            y los{' '}
            <Link to="/terms-and-conditions" className="font-medium text-[#CF413D] hover:text-[#B93936]">
              términos y condiciones
            </Link>
            .
          </p>
          <p className="mt-2">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-[#CF413D] hover:text-[#B93936]">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;