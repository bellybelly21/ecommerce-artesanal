import { Link } from 'react-router-dom';
import { useApp } from './hooks/useApp';

export const Catalog = () => {
  const { products, cart, addToCart } = useApp();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Nuestro Catálogo</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => {
          // El stock disponible es el stock real menos lo que ya está en el carrito
          const cartItem = cart.find(c => c.product.id === product.id);
          const availableStock = product.stock - (cartItem?.quantity || 0);

          return (
            <div key={product.id} className="border rounded shadow-sm p-4 flex flex-col">
              <Link to={`/producto/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded cursor-pointer hover:opacity-80 transition" />
              </Link>
              <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.category}</p>
              
              <div className="mt-2 mb-4">
                {product.offerPrice ? (
                  <>
                    <span className="text-gray-400 line-through mr-2">${product.price}</span>
                    <span className="text-green-600 font-bold text-lg">${product.offerPrice}</span>
                  </>
                ) : (
                  <span className="font-bold text-lg">${product.price}</span>
                )}
              </div>
              
              <p className="text-sm mb-4">Stock disponible: {availableStock}</p>
              
              <button 
                onClick={() => addToCart(product)}
                disabled={availableStock <= 0}
                className={`mt-auto py-2 rounded text-white ${availableStock > 0 ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                {availableStock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};