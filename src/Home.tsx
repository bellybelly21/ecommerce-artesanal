import { Link } from 'react-router-dom';
import { useApp } from './hooks/useApp';

export const Home = () => {
  const { products, cart, addToCart } = useApp();

  // Seleccionamos 3 productos destacados (priorizando los que tienen precio de oferta)
  const featuredProducts = [...products]
    .sort((a, b) => (b.offerPrice ? 1 : 0) - (a.offerPrice ? 1 : 0))
    .slice(0, 3);

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-amber-700 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Artesanías Sur</h1>
        <p className="text-xl md:text-2xl mb-8">Productos locales, hechos a mano con dedicación y tradición.</p>
        <Link to="/catalogo" className="bg-white text-amber-800 px-6 py-3 rounded-full font-bold text-lg hover:bg-amber-100 transition">
          Ver Catálogo
        </Link>
      </section>

      {/* Quiénes Somos */}
      <section className="container mx-auto py-16 px-4 text-center max-w-3xl">
        <h2 className="text-3xl font-bold mb-4 text-amber-900">¿Quiénes Somos?</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Somos una pequeña agrupación de artesanos y productores del sur del país. Nuestro objetivo es llevar la autenticidad de nuestras tradiciones directamente a tu hogar. Ofrecemos miel 100% orgánica, tejidos a telar, artesanías únicas y cervezas de autor, respetando siempre el comercio justo y el cuidado del medio ambiente.
        </p>
      </section>

      {/* Productos Destacados */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-amber-900">Productos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => {
              const cartItem = cart.find(c => c.product.id === product.id);
              const availableStock = product.stock - (cartItem?.quantity || 0);

              return (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <Link to={`/producto/${product.id}`}>
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                    
                    <div className="mt-auto mb-4">
                      {product.offerPrice ? (
                        <>
                          <span className="text-gray-400 line-through mr-2">${product.price}</span>
                          <span className="text-green-600 font-bold text-xl">${product.offerPrice}</span>
                        </>
                      ) : (
                        <span className="font-bold text-xl">${product.price}</span>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => addToCart(product)}
                      disabled={availableStock <= 0}
                      className={`w-full py-2 rounded text-white font-semibold transition ${availableStock > 0 ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      {availableStock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};