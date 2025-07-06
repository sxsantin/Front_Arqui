import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL;

export default function ListaLibros() {
  const { token } = useContext(AuthContext);
  const [libros, setLibros] = useState([]);

  const cargarLibros = async () => {
    const res = await fetch(`${API}/libros`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) return;
    const data = await res.json();
    setLibros(data);
  };

  useEffect(() => {
    cargarLibros();
    window.addEventListener('libroGuardado', cargarLibros);
    return () => window.removeEventListener('libroGuardado', cargarLibros);
  }, []);

  const eliminar = async (id) => {
    const confirmado = window.confirm('¿Estás seguro de que quieres eliminar este libro?');
    if (!confirmado) return;

    const res = await fetch(`${API}/libros/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return alert(await res.text());
    cargarLibros();
  };

  const editar = (libro) => {
    window.dispatchEvent(new CustomEvent('editarLibro', { detail: { libro } }));
  };

  return (
    <ul className="list-group animate__animated animate__fadeIn">
      {libros.map((libro) => (
        <li key={libro._id} className="list-group-item">
          <div>
            <strong>{libro.titulo}</strong> — {libro.autor} ({libro.anio})
          </div>
          <div className="acciones">
            <i className="fas fa-edit me-3 text-primary" onClick={() => editar(libro)}></i>
            <i className="fas fa-trash text-danger" onClick={() => eliminar(libro._id)}></i>
          </div>
        </li>
      ))}
    </ul>
  );
}
