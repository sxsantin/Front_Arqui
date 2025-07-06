import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function RegisterForm() {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return setMensaje('Usuario inválido (solo letras, números o guiones bajos)');
    }

    if (password.length < 3 || password.length > 100) {
      return setMensaje('La contraseña debe tener entre 3 y 100 caracteres');
    }

    try {
      await register(username, password);
      setMensaje('¡Registro exitoso! Ahora inicia sesión.');
      setUsername('');
      setPassword('');
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 justify-content-center">
      <div className="col-12 col-md-5">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Usuario"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
        />
      </div>
      <div className="col-12 col-md-5">
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Contraseña (mín. 3 caracteres)"
          required
          minLength={3}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-2 d-grid">
        <button type="submit" className="btn btn-danger btn-lg">
          <i className="fas fa-user-plus me-1"></i> Registrarse
        </button>
      </div>
      {mensaje && <p className="text-center mt-3 text-danger">{mensaje}</p>}
    </form>
  );
}
