import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import AuthTabs from './components/AuthTabs';
import LibroForm from './components/LibroForm';
import ListaLibros from './components/ListaLibros';
import LogoutButton from './components/LogoutButton';
import ThemeToggle from './components/ThemeToggle';

import './style.css';

function MainApp() {
  const { token, username } = useContext(AuthContext);

  return (
    <div className="container py-5 my-5 bg-white rounded-4 shadow-lg">
      <h1 className="text-center mb-4 fw-bold text-danger">
        <i className="fas fa-book-open-reader me-2"></i> Biblioteca Cloud
      </h1>

      <p className="text-center fs-5 fw-semibold text-secondary mb-4">
        {token ? `Hola, ${username}` : 'No has iniciado sesión'}
      </p>

      {!token ? (
        <AuthTabs />
      ) : (
        <>
          <LibroForm />
          <ListaLibros />
          <LogoutButton />
        </>
      )}

      <ThemeToggle />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
