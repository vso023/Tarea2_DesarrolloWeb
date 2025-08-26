import { useEffect, useState, useMemo } from "react";
import "../styles/ToDo.css";

export default function ToDo({ user, useGlobalStorage = true }) {
    const storageKey = useMemo(
        () => useGlobalStorage ? "songs_global" : `songs_${user?.usuario || "anon"}`,
        [user, useGlobalStorage]
    );

    const [songs, setSongs] = useState([]);
    const [texto, setTexto] = useState("");
    const [load, setLoad] = useState(false);

    // 🔹 Cargar canciones al iniciar
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        setLoad(true);
        if (saved) {
            setSongs(JSON.parse(saved));
        }
    }, [storageKey]);

    // 🔹 Guardar canciones cuando cambien
    useEffect(() => {
        if (load) {
            localStorage.setItem(storageKey, JSON.stringify(songs));
        }
    }, [songs, storageKey, load]);

    const addToDo = (e) => {
        e.preventDefault();
        const txt = texto.trim();
        if (!txt) return;

        setSongs(prev => [
            ...prev,
            { id: crypto.randomUUID(), text: txt, done: false, ts: Date.now() }
        ]);
        setTexto("");
    };

    const toogleToDo = (id) => {
        setSongs(prev => prev.map(it => it.id === id ? { ...it, done: !it.done } : it));
    };

    const removeToDo = (id) => {
        setSongs(prev => prev.filter(it => it.id !== id));
    };

    const clearCompleted = () => {
        setSongs(prev => prev.filter(it => !it.done));
    };

    const pending = songs.filter(i => !i.done).length;

    return (
        <section className="canciones_por_escuchar">
            <h2>Canciones por escuchar</h2>
            <p>Añade las canciones que descubras y quieras escuchar</p>

            <form className="form_canciones" onSubmit={addToDo} style={{ display: "flex", gap: "0.5rem" }}>
                <input
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    placeholder="Nueva canción"
                    aria-label="Nueva canción"
                />
                <button type="submit">Agregar canción</button>
            </form>

            <ul className="lista-tarea">
                {songs.length === 0 && <li>No hay canciones por escuchar</li>}
                {songs.map(item => (
                    <li key={item.id} className="songs-map">
                        <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => toogleToDo(item.id)}
                            aria-label={`Marcar "${item.text}"`}
                        />
                        <span className="text-checkbox">{item.text}</span>
                        <button onClick={() => removeToDo(item.id)} aria-label="Eliminar">
                            🗑
                        </button>
                    </li>
                ))}
            </ul>

            <div className="pendientes">
                <span>Pendientes: </span>
                <span>{pending}</span>
                <button onClick={clearCompleted}>Borrar escuchadas</button>
            </div>
        </section>
    );
}