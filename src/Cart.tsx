import { useApp } from './hooks/useApp';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { cart, clearCart, confirmPurchase, currentUser } = useApp();

  if (!currentUser) {
    return <div className="text-center mt-10">Debes <Link to="/login" className="text-amber-600 font-bold">iniciar sesión</Link> para ver tu carrito.</div>;
  }

  if (cart.length === 0) {
    return <div className="text-center mt-10 text-gray-500 text-xl">Tu carrito está vacío.</div>;
  }

  const subtotal = cart.reduce((acc, item) => {
    const priceToUse = item.product.offerPrice || item.product.price;
    return acc + (priceToUse * item.quantity);
  }, 0);

  // Verificar cumpleaños (DD-MM)
  const today = new Date().toISOString().substring(5, 10);
  const isBirthday = currentUser.dob.substring(5, 10) === today;
  
  const discount = isBirthday ? subtotal * 0.10 : 0;
  const total = subtotal - discount;

  const handleConfirm = () => {
    confirmPurchase();
    alert("¡Compra realizada con éxito! El stock ha sido actualizado.");
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Tu Carrito</h2>
      <div className="bg-white p-6 rounded shadow">
        {cart.map(item => (
          <div key={item.product.id} className="flex justify-between items-center border-b py-4">
            <div className="flex items-center gap-4">
              <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h4 className="font-bold">{item.product.name}</h4>
                <p className="text-gray-500 text-sm">Cantidad: {item.quantity}</p>
              </div>
            </div>
            <p className="font-bold">${(item.product.offerPrice || item.product.price) * item.quantity}</p>
          </div>
        ))}

        <div className="mt-6 text-right space-y-2">
          <p className="text-gray-600">Subtotal: ${subtotal}</p>
          {isBirthday && <p className="text-green-600 font-bold">¡Descuento Cumpleañero (10%)!: -${discount}</p>}
          <p className="text-2xl font-bold border-t pt-2 mt-2">Total: ${total}</p>
        </div>

        <div className="flex justify-between mt-8">
          {/* Al vaciar el carrito, las cantidades en el componente Catálogo vuelven a mostrar el stock real automáticamente */}
          <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Vaciar Carrito</button>
          <button onClick={handleConfirm} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-bold">Confirmar Compra</button>
        </div>
      </div>
    </div>
  );
};