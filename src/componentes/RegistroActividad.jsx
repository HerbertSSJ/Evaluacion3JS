import React, { useState, useEffect } from 'react';
import '../estilos/registroActividad.css';

const RegistroActividad = () => {
  const [responsable, setResponsable] = useState('');
  const [asistentesEstimados, setAsistentesEstimados] = useState('');
  const [tipoActividad, setTipoActividad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaActividad, setFechaActividad] = useState('');

  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('actividadesVecinales');
    if (datosGuardados) {
      setActividades(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('actividadesVecinales', JSON.stringify(actividades));
  }, [actividades]);

  const manejarEnvio = (e) => {
    e.preventDefault();

    const nuevaActividad = {
      id: Date.now(), 
      responsable,
      asistentesEstimados,
      tipoActividad,
      descripcion,
      fechaActividad,
    };

    setActividades([...actividades, nuevaActividad]);


    setResponsable('');
    setAsistentesEstimados('');
    setTipoActividad('');
    setDescripcion('');
    setFechaActividad('');
  };

  return (
    <>
      <form className="formulario" onSubmit={manejarEnvio}>
        <h2>Registro de Actividad Vecinal</h2>

        <label>Responsable:</label>
        <input type="text" value={responsable} onChange={(e) => setResponsable(e.target.value)} required />

        <label>Asistentes estimados:</label>
        <input type="number" value={asistentesEstimados} onChange={(e) => setAsistentesEstimados(e.target.value)} required />

        <label>Tipo de actividad:</label>
        <select value={tipoActividad} onChange={(e) => setTipoActividad(e.target.value)} required>
          <option value="">Seleccionar</option>
          <option value="taller">Taller</option>
          <option value="limpieza">Jornada de limpieza</option>
          <option value="reunion">Reunión comunitaria</option>
        </select>

        <label>Descripción:</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />

        <label>Fecha programada:</label>
        <input type="date" value={fechaActividad} onChange={(e) => setFechaActividad(e.target.value)} required />

        <button type="submit">Guardar Actividad</button>
      </form>


      <section className="lista-actividades">
        <h3>Actividades Registradas</h3>
        {actividades.length === 0 ? (
          <p>No hay actividades registradas aún.</p>
        ) : (
          <ul>
            {actividades.map((actividad) => (
              <li key={actividad.id}>
                <strong>{actividad.tipoActividad}</strong> - {actividad.responsable} ({actividad.fechaActividad})
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default RegistroActividad;