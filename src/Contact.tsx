import { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Gracias por contactarnos, ${formData.name}. Hemos recibido tu mensaje.`);
    setFormData({ name: '', email: '', message: '' }); // Limpiar formulario
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-amber-900">Contacto</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Formulario */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nombre Completo</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Correo Electrónico</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                onChange={e => setFormData({...formData, email: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Mensaje</label>
              <textarea 
                required 
                rows={5}
                value={formData.message}
                className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                onChange={e => setFormData({...formData, message: e.target.value})} 
              />
            </div>
            <button type="submit" className="bg-amber-600 text-white py-3 rounded font-bold hover:bg-amber-700 transition">
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Información y Mapa */}
        <div className="flex flex-col gap-8">
          <div className="bg-amber-50 p-8 rounded-lg shadow-sm border border-amber-100">
            <h2 className="text-2xl font-bold mb-4 text-amber-900">Información de la Empresa</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong className="text-gray-900">Dirección:</strong> Av. Los Artesanos 1234, Barrio Sur.</p>
              <p><strong className="text-gray-900">Teléfono:</strong> +56 9 8765 4321</p>
              <p><strong className="text-gray-900">Correo:</strong> contacto@artesaniassur.cl</p>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-md bg-white">
            <h2 className="text-xl font-bold p-4 bg-gray-50 border-b">Nuestra Ubicación</h2>
            <iframe 
              src="https://maps.google.com/maps?q=INACAP%20Sede%20La%20Granja&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="300" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de INACAP Sede La Granja"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};