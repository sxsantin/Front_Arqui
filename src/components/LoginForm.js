import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return setError('Usuario inválido (solo letras, números o guiones bajos)');
    }

    if (password.length < 3 || password.length > 100) {
      return setError('Contraseña inválida');
    }

    try {
      await login(username, password);
    } catch (err) {
      setError(err.message);
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
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-2 d-grid">
        <button type="submit" className="btn btn-danger btn-lg">
          <i className="fas fa-sign-in-alt me-1"></i> Entrar
        </button>
      </div>
      {error && <p className="text-danger text-center mt-3">{error}</p>}
    </form>
  );
}
