import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from './hooks/useApp';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, cart, addToCart } = useApp();

  // Buscar el producto por ID
  const product = products.find(p => p.id === Number(id));

  // Manejo de error si el producto no existe o la URL es inválida
  if (!product) {
    return (
      <div className="container mx-auto p-10 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Producto no encontrado</h2>
        <button onClick={() => navigate('/catalogo')} className="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700">
          Volver al Catálogo
        </button>
      </div>
    );
  }

  // Calcular stock dinámico
  const cartItem = cart.find(c => c.product.id === product.id);
  const availableStock = product.stock - (cartItem?.quantity || 0);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <button onClick={() => navigate('/catalogo')} className="mb-6 text-amber-700 hover:underline flex items-center gap-2">
        &larr; Volver al Catálogo
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Imagen del producto */}
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover min-h-[400px]" />
        </div>

        {/* Detalles del producto */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <span className="text-sm text-amber-600 font-bold tracking-widest uppercase mb-2">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product.description}</p>
          
          <div className="mb-6">
            {product.offerPrice ? (
              <div className="flex items-center gap-4">
                <span className="text-2xl text-gray-400 line-through">${product.price}</span>
                <span className="text-4xl text-green-600 font-bold">${product.offerPrice}</span>
              </div>
            ) : (
              <span className="text-4xl font-bold text-gray-800">${product.price}</span>
            )}
          </div>

          <div className="bg-gray-100 p-4 rounded mb-8">
            <p className="text-gray-700">
              Stock disponible: <span className="font-bold text-lg">{availableStock}</span> unidades
            </p>
          </div>

          <button 
            onClick={() => addToCart(product)}
            disabled={availableStock <= 0}
            className={`w-full md:w-auto px-8 py-4 rounded text-white font-bold text-lg transition ${availableStock > 0 ? 'bg-amber-600 hover:bg-amber-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            {availableStock > 0 ? 'Agregar al Carrito' : 'Agotado'}
          </button>
        </div>
      </div>
    </div>
  );
};