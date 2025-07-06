import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function LogoutButton() {
  const { logout } = useContext(AuthContext);
  return (
    <button onClick={logout} className="btn btn-outline-danger w-100 mt-4">
      <i className="fas fa-power-off me-2"></i> Cerrar sesión
    </button>
  );
}
