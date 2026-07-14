import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from './hooks/useApp';

export const Register = () => {
  const { registerUser, users } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', dob: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const calculateAge = (dob: string) => {
    const diff = Date.now() - new Date(dob).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };

  const validatePassword = (pass: string) => {
    // Acepta CUALQUIER carácter especial, asegurando min 8 chars, 1 mayús, 1 minús, 1 número
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(pass);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar edad
    if (calculateAge(formData.dob) < 18) return setError('Debes ser mayor de 18 años.');
    
    // Validar dominio correo
    if (!formData.email.endsWith('@gmail.com') && !formData.email.endsWith('@inacap.cl')) {
      return setError('Solo se permiten correos @gmail.com o @inacap.cl');
    }

    // Validar correo único
    if (users.some(u => u.email === formData.email)) return setError('El correo ya está registrado.');

    // Validar contraseñas
    if (formData.password !== formData.confirmPassword) return setError('Las contraseñas no coinciden.');
    if (!validatePassword(formData.password)) {
      return setError('La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
    }

    // Registrar usuario
    registerUser({
      name: formData.name,
      email: formData.email,
      dob: formData.dob,
      password: formData.password,
      failedAttempts: 0,
      isLocked: false
    });
    
    alert('Registro exitoso. Inicia sesión.');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>
      {error && <p className="text-red-600 text-sm mb-4 font-semibold">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Nombre completo" required className="border p-2 rounded focus:outline-none focus:border-amber-600" onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="date" required className="border p-2 rounded focus:outline-none focus:border-amber-600" onChange={e => setFormData({...formData, dob: e.target.value})} />
        <input type="email" placeholder="Correo electrónico" required className="border p-2 rounded focus:outline-none focus:border-amber-600" onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Contraseña" required className="border p-2 rounded focus:outline-none focus:border-amber-600" onChange={e => setFormData({...formData, password: e.target.value})} />
        <input type="password" placeholder="Repetir Contraseña" required className="border p-2 rounded focus:outline-none focus:border-amber-600" onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
        <button type="submit" className="bg-amber-600 text-white py-2 rounded hover:bg-amber-700 font-bold transition">Registrar</button>
      </form>
    </div>
  );
};