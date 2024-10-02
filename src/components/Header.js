import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img src="/path-to-user-avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <h2 className="text-lg font-semibold">Ashfak Sayem</h2>
              <p className="text-sm text-gray-600">ashfaksayem@gmail.com</p>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <nav className={`${isOpen ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 right-0 bg-white md:bg-transparent shadow-md md:shadow-none`}>
            <ul className="md:flex">
              <li className="block md:inline-block">
                <Link to="/dashboard" className="block px-4 py-2 text-red-600 font-semibold hover:bg-red-100 md:hover:bg-transparent md:hover:text-red-700">Dashboard</Link>
              </li>
              <li className="block md:inline-block">
                <Link to="/carnet" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900">Carnet</Link>
              </li>
              <li className="block md:inline-block">
                <Link to="/suscripcion" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900">Suscripción</Link>
              </li>
              <li className="block md:inline-block">
                <Link to="/ajustes" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-900">Ajustes</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;