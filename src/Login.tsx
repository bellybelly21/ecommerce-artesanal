import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from './hooks/useApp';

export const Login = () => {
  const { loginUser } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loginUser(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      {error && <p className="text-red-600 font-bold text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Correo electrónico" required className="border p-2 rounded" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" required className="border p-2 rounded" onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="bg-amber-600 text-white py-2 rounded hover:bg-amber-700">Entrar</button>
      </form>
    </div>
  );
};