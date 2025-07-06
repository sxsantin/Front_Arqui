import { createContext, useState } from 'react';

export const AuthContext = createContext();

const API = process.env.REACT_APP_API_URL;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const login = async (user, pass) => {
    if (!isValidUsername(user) || !isValidPassword(pass)) {
      throw new Error('Credenciales inválidas');
    }

    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.trim(), password: pass })
    });

    if (!res.ok) throw new Error('Usuario o contraseña incorrectos');

    const data = await res.json();

    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    setToken(data.token);
    setUsername(data.username);
  };

  const register = async (user, pass) => {
    if (!isValidUsername(user) || !isValidPassword(pass)) {
      throw new Error('Datos de registro inválidos');
    }

    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.trim(), password: pass })
    });

    if (!res.ok) throw new Error(await res.text());
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername('');
  };

  const isValidUsername = (str) => /^[a-zA-Z0-9_]{3,20}$/.test(str);
  const isValidPassword = (str) => typeof str === 'string' && str.length >= 3 && str.length <= 100;

  return (
    <AuthContext.Provider value={{ token, username, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

