import React, { useState } from 'react';
import '../estilos/registroActividad.css';

const RegistroActividad = () => {
  const [responsable, setResponsable] = useState('');
  const [asistentesEstimados, setAsistentesEstimados] = useState('');
  const [tipoActividad, setTipoActividad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaActividad, setFechaActividad] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();

    const nuevaActividad = {
      responsable,
      asistentesEstimados,
      tipoActividad,
      descripcion,
      fechaActividad
    };

    console.log("Actividad registrada:", nuevaActividad);

    // Limpiar campos
    setResponsable('');
    setAsistentesEstimados('');
    setTipoActividad('');
    setDescripcion('');
    setFechaActividad('');
  };

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <h2>Registro de Actividad Vecinal</h2>

      <label>Responsable:</label>
      <input
        type="text"
        value={responsable}
        onChange={(e) => setResponsable(e.target.value)}
        required
      />

      <label>Asistentes estimados:</label>
      <input
        type="number"
        value={asistentesEstimados}
        onChange={(e) => setAsistentesEstimados(e.target.value)}
        required
      />

      <label>Tipo de actividad:</label>
      <select
        value={tipoActividad}
        onChange={(e) => setTipoActividad(e.target.value)}
        required
      >
        <option value="">Seleccionar</option>
        <option value="taller">Taller</option>
        <option value="limpieza">Jornada de limpieza</option>
        <option value="reunion">Reunión comunitaria</option>
      </select>

      <label>Descripción:</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      ></textarea>

      <label>Fecha programada:</label>
      <input
        type="date"
        value={fechaActividad}
        onChange={(e) => setFechaActividad(e.target.value)}
        required
      />

      <button type="submit">Guardar Actividad</button>
    </form>
  );
};

export default RegistroActividad;