import React, { useState, useEffect } from 'react';
import '../estilos/registroActividad.css';

const RegistroActividad = () => {
  const [responsable, setResponsable] = useState('');
  const [asistentesEstimados, setAsistentesEstimados] = useState('');
  const [tipoActividad, setTipoActividad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaActividad, setFechaActividad] = useState('');

  const [actividades, setActividades] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  // Cargar desde localStorage
  useEffect(() => {
    const datosGuardados = localStorage.getItem('actividadesVecinales');
    if (datosGuardados) {
      setActividades(JSON.parse(datosGuardados));
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem('actividadesVecinales', JSON.stringify(actividades));
  }, [actividades]);

  // Guardar o actualizar
  const manejarEnvio = (e) => {
    e.preventDefault();

    const nuevaActividad = {
      id: modoEdicion ? idEditando : Date.now(),
      responsable,
      asistentesEstimados,
      tipoActividad,
      descripcion,
      fechaActividad,
    };

    if (modoEdicion) {
      // Actualizar actividad
      const actividadesActualizadas = actividades.map((actividad) =>
        actividad.id === idEditando ? nuevaActividad : actividad
      );
      setActividades(actividadesActualizadas);
      setModoEdicion(false);
      setIdEditando(null);
    } else {
      // Crear nueva actividad
      setActividades([...actividades, nuevaActividad]);
    }

    // Limpiar formulario
    setResponsable('');
    setAsistentesEstimados('');
    setTipoActividad('');
    setDescripcion('');
    setFechaActividad('');
  };

  // Eliminar actividad
  const eliminarActividad = (id) => {
    const actividadesFiltradas = actividades.filter((actividad) => actividad.id !== id);
    setActividades(actividadesFiltradas);
  };

  // Cargar datos en formulario para editar
  const editarActividad = (actividad) => {
    setResponsable(actividad.responsable);
    setAsistentesEstimados(actividad.asistentesEstimados);
    setTipoActividad(actividad.tipoActividad);
    setDescripcion(actividad.descripcion);
    setFechaActividad(actividad.fechaActividad);
    setModoEdicion(true);
    setIdEditando(actividad.id);
  };

  return (
    <>
      <form className="formulario" onSubmit={manejarEnvio}>
        <h2>{modoEdicion ? 'Editar Actividad' : 'Registro de Actividad Vecinal'}</h2>

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

        <button type="submit">{modoEdicion ? 'Actualizar' : 'Guardar Actividad'}</button>
      </form>

      {/* Lista de actividades */}
      <section className="lista-actividades">
        <h3>Actividades Registradas</h3>
        {actividades.length === 0 ? (
          <p>No hay actividades registradas aún.</p>
        ) : (
          <ul>
            {actividades.map((actividad) => (
              <li key={actividad.id}>
                <strong>{actividad.tipoActividad}</strong> - {actividad.responsable} ({actividad.fechaActividad})
                <br />
                <button onClick={() => editarActividad(actividad)}>Editar</button>
                <button onClick={() => eliminarActividad(actividad.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default RegistroActividad;