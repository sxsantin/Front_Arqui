import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL;

export default function LibroForm() {
  const { token } = useContext(AuthContext);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anio, setAnio] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.libro) {
        setModoEdicion(true);
        setIdEditar(e.detail.libro._id);
        setTitulo(e.detail.libro.titulo);
        setAutor(e.detail.libro.autor);
        setAnio(e.detail.libro.anio);
      }
    };
    window.addEventListener('editarLibro', handler);
    return () => window.removeEventListener('editarLibro', handler);
  }, []);

  const validarTexto = (texto) => /^[a-zA-Z0-9\s\-_,.()¿?¡!]+$/.test(texto.trim());
  const validarAutor = (texto) => /^[a-zA-Z\s\-']+$/.test(texto.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tituloVal = titulo.trim();
    const autorVal = autor.trim();
    const anioVal = anio.trim();

    if (!tituloVal || !autorVal || !anioVal) return alert('Completa todos los campos');
    if (!validarTexto(tituloVal)) return alert('Título contiene caracteres inválidos');
    if (!validarAutor(autorVal)) return alert('Autor contiene caracteres inválidos');
    if (!/^\d{1,4}$/.test(anioVal) || anioVal < 0 || anioVal > 2100) return alert('Año inválido');

    const metodo = modoEdicion ? 'PUT' : 'POST';
    const url = modoEdicion ? `${API}/libros/${idEditar}` : `${API}/libros`;

    const res = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo: tituloVal,
        autor: autorVal,
        anio: Number(anioVal),
      }),
    });

    if (!res.ok) return alert(await res.text());

    window.dispatchEvent(new CustomEvent('libroGuardado'));
    setTitulo('');
    setAutor('');
    setAnio('');
    setModoEdicion(false);
    setIdEditar(null);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 mb-4">
      <div className="col-12 col-md-4">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      <div className="col-12 col-md-4">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
      </div>
      <div className="col-12 col-md-2">
        <input
          type="number"
          className="form-control form-control-lg"
          placeholder="Año"
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
          required
          min={0}
          max={2100}
        />
      </div>
      <div className="col-12 col-md-2 d-grid">
        <button type="submit" className="btn btn-danger btn-lg">
          <i className={`fas fa-${modoEdicion ? 'edit' : 'plus'} me-1`}></i>{' '}
          {modoEdicion ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </form>
  );
}