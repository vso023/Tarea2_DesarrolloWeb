import "../styles/Dashboard.css";

export default function Dashboard({ user, allSongs, onDeleteSong }) {
  // Solo admins pueden ver el dashboard
  if (!user || !user.isAdmin) {
    return <p>No tienes permisos para ver el dashboard.</p>;
  }

  // Saludo dinámico según la hora
  const hora = new Date().getHours();
  let saludo = "Hola";
  if (hora >= 5 && hora < 12) saludo = "Buenos días";
  else if (hora >= 12 && hora < 18) saludo = "Buenas tardes";
  else saludo = "Buenas noches";

  // Calcular estadísticas
  const totalCanciones = allSongs.length;
  const pendientes = allSongs.filter(song => !song.done).length;

  return (
    <section className="dashboard">
      <h2>{`${saludo}, ${user.usuario}`}</h2>

      <div className="estadisticas">
        <p>Total de canciones: {totalCanciones}</p>
        <p>Canciones por escuchar: {pendientes}</p>
      </div>

      <h3>🎵 Todas las canciones de los usuarios</h3>
      <ul className="lista-canciones">
        {allSongs.map((song) => (
          <li key={song.id} className="cancion-item">
            <strong>{song.titulo}</strong> — de {song.usuario}
            <button
              className="btn-borrar"
              onClick={() => onDeleteSong(song.id)}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
