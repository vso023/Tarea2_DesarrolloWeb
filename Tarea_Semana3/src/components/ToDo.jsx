import { useEffect, useState, useMemo } from "react";
import "../styles/ToDo.css";

export default function ToDo({ user, useGlobalStorage = true, onSongsChange }) {
    const storageKey = useMemo(
        () => useGlobalStorage ? "songs_global" : `songs_${user?.usuario || "anon"}`,
        [user, useGlobalStorage]
    );

    const [songs, setSongs] = useState([]);
    const [texto, setTexto] = useState("");
    const [load, setLoad] = useState(false);
    const [filter, setFilter] = useState("all");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    // Cargar canciones al iniciar
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        setLoad(true);
        if (saved) {
            setSongs(JSON.parse(saved));
        }
    }, [storageKey]);

    // Guardar canciones cuando cambien
    useEffect(() => {
        if (load) {
            localStorage.setItem(storageKey, JSON.stringify(songs));
        }
    }, [songs, storageKey, load]);

    const addToDo = (e) => {
        e.preventDefault();
        const txt = texto.trim();
        if (!txt) return;

        const nuevaCancion = {
            id: crypto.randomUUID(),
            titulo: txt,
            done: false,
            ts: Date.now(),
            usuario: user?.usuario || "anon",
        };
        const updatedSongs = [...songs, nuevaCancion];
        setSongs(updatedSongs);
        if (useGlobalStorage && onSongsChange) {
            onSongsChange(updatedSongs);
        }
        setTexto("");
    };

    const toogleToDo = (id) => {
        const updatedSongs = songs.map(it => it.id === id ? { ...it, done: !it.done } : it);
        setSongs(updatedSongs);
        if (useGlobalStorage && onSongsChange) {
            onSongsChange(updatedSongs);
        }
    };

    const removeToDo = (id) => {
        const updatedSongs = songs.filter(it => it.id !== id);
        setSongs(updatedSongs);
        if (useGlobalStorage && onSongsChange) {
            onSongsChange(updatedSongs);
        }
    };

    const clearCompleted = () => {
        const updatedSongs = songs.filter(it => !it.done);
        setSongs(updatedSongs);
        if (useGlobalStorage && onSongsChange) {
            onSongsChange(updatedSongs);
        }
    };


    const filterSongs = (e) => {
        setFilter(e.target.value);
    };

    let filteredSongs;
    if (filter === "pending") {
        filteredSongs = songs.filter(i => !i.done);
    } else if (filter === "listened") {
        filteredSongs = songs.filter(i => i.done);
    } else {
        filteredSongs = songs;
    }

    const startEditing = (song) => {
        setEditingId(song.id);
        setEditText(song.titulo);
    };
    const saveEdit = (id) => {
        const updatedSongs = songs.map(song => (song.id === id ? { ...song, titulo: editText } : song));
        setSongs(updatedSongs);
        if (useGlobalStorage && onSongsChange) {
            onSongsChange(updatedSongs);
        }
        setEditingId(null);
    };
    return (
        <section className="canciones_por_escuchar">
            <h2>Canciones por escuchar</h2>
            <p>Añade las canciones que descubras y quieras escuchar</p>

            {/* Formulario */}
            <form
                className="form_canciones"
                onSubmit={addToDo}
                style={{ display: "flex", gap: "0.5rem" }}
            >
                <input
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Nueva canción"
                    aria-label="Nueva canción"
                />
                <button type="submit">Agregar canción</button>
            </form>

            {/* Filtro */}
            <div className="filtro_canciones" style={{ margin: "1rem 0" }}>
                <label htmlFor="miSelect">Filtrar canciones: </label>
                <select id="miSelect" value={filter} onChange={filterSongs}>
                    <option value="all">Todas</option>
                    <option value="pending">Pendientes</option>
                    <option value="listened">Escuchadas</option>
                </select>
            </div>

            {/* Lista */}
            <ul className="lista-canciones">
                {filteredSongs.length === 0 && <li>No hay canciones</li>}
                {filteredSongs.map((item) => (
                    <li key={item.id} className="songs-map">
                        <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => toogleToDo(item.id)}
                            aria-label={`Marcar "${item.titulo}"`}
                        />

                        {editingId === item.id ? (
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                onBlur={() => saveEdit(item.id)}
                                onKeyDown={(e) => e.key === "Enter" && saveEdit(item.id)}
                                autoFocus
                            />
                        ) : (
                            <span
                                className="text-checkbox"
                                onDoubleClick={() => startEditing(item)}
                            >
                                {item.titulo}
                            </span>
                        )}

                        <button className="delete-song" onClick={() => removeToDo(item.id)} aria-label="Eliminar">
                            🗑
                        </button>
                    </li>
                ))}
            </ul>

            {/* Botón borrar completadas */}
            <button className="delete" onClick={clearCompleted} style={{ marginTop: "1rem" }}>
                Borrar escuchadas
            </button>
        </section>
    );
}