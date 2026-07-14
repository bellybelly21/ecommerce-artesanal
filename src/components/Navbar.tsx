import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

export const Navbar = () => {
  const { currentUser, logoutUser, cart } = useApp();
  const navigate = useNavigate();
  // Estado para controlar el menú hamburguesa en móviles
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logoutUser();
    setIsMenuOpen(false);
    navigate('/');
  };

  // Función para cerrar el menú al hacer clic
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-amber-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-wide text-amber-100" onClick={closeMenu}>
            Artesanías Sur
          </Link>

          {/* Menú Desktop (oculto en móviles) */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-amber-100 hover:text-white transition-colors">Inicio</Link>
            <Link to="/catalogo" className="text-amber-100 hover:text-white transition-colors">Catálogo</Link>
            <Link to="/contacto" className="text-amber-100 hover:text-white transition-colors">Contacto</Link>
            
            {/* Enlace al Carrito con Badge Dinámico */}
            <Link to="/carrito" className="flex items-center gap-1 text-amber-100 hover:text-white transition-colors font-medium">
              Carrito 
              {cartCount > 0 && (
                <span className="bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Separador Visual */}
            <div className="h-6 w-px bg-amber-700 mx-2"></div> 

            {/* Renderizado Condicional de Autenticación */}
            {currentUser ? (
              <div className="flex items-center gap-4">
                <span className="text-amber-200 text-sm">Hola, {currentUser.name.split(' ')[0]}</span>
                <button 
                  onClick={handleLogout} 
                  className="border border-red-500 text-red-400 hover:bg-red-500 hover:text-white px-4 py-1.5 rounded text-sm transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-amber-100 hover:text-white transition-colors text-sm">Iniciar Sesión</Link>
                <Link to="/registro" className="bg-amber-700 hover:bg-amber-600 px-4 py-1.5 rounded text-sm font-medium transition-colors">
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Elementos Móviles (Ícono Carrito + Hamburguesa) */}
          <div className="md:hidden flex items-center">
             {/* El carrito siempre visible en móvil mejora la conversión */}
             <Link to="/carrito" className="mr-4 relative text-amber-100" onClick={closeMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
             </Link>

            {/* Botón Toggle Menú */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-100 hover:text-white focus:outline-none p-1"
              aria-label="Menú principal"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> // Ícono X (Cerrar)
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /> // Ícono Hamburguesa
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable (Solo Mobile) */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-800 border-t border-amber-700 shadow-inner">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" onClick={closeMenu} className="block py-2 text-base font-medium text-amber-100 hover:text-white">Inicio</Link>
            <Link to="/catalogo" onClick={closeMenu} className="block py-2 text-base font-medium text-amber-100 hover:text-white">Catálogo</Link>
            <Link to="/contacto" onClick={closeMenu} className="block py-2 text-base font-medium text-amber-100 hover:text-white">Contacto</Link>
            
            <div className="border-t border-amber-700 my-4"></div>
            
            {currentUser ? (
              <div className="py-2">
                <p className="text-sm text-amber-300 mb-3 font-medium">Hola, {currentUser.name}</p>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-center border border-red-500 text-red-100 bg-red-600/20 py-2 rounded-md font-medium hover:bg-red-600 hover:text-white transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Link to="/login" onClick={closeMenu} className="w-full text-center border border-amber-600 text-amber-100 py-2 rounded-md font-medium hover:bg-amber-700">
                  Iniciar Sesión
                </Link>
                <Link to="/registro" onClick={closeMenu} className="w-full text-center bg-amber-600 text-white py-2 rounded-md font-medium hover:bg-amber-500">
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};