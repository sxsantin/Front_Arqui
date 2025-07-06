import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="mb-5">
      <ul className="nav nav-tabs justify-content-center mb-4">
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            <i className="fas fa-sign-in-alt me-1"></i> Iniciar sesión
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link fw-bold ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            <i className="fas fa-user-plus me-1"></i> Registrarse
          </button>
        </li>
      </ul>
      {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
