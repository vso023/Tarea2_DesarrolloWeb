import { useState, useEffect } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import Dashboard from "./components/Dashboard";
import "./App.css";

export default function App() {
  const [sessionActive, setSessionActive] = useState(false);
  const [user, setUser] = useState(null);
  const [allSongs, setAllSongs] = useState([]);
  // Tema
  const [theme, setTheme] = useState("dark");

  // Cargamos sesión y tema del localStorage al iniciar
  useEffect(() => {
    const ses = localStorage.getItem("sesion") === "activa";
    const usu = JSON.parse(localStorage.getItem("usuario_actual") || "null");
    setSessionActive(ses);
    setUser(usu);

    const savedSongs = localStorage.getItem("songs_global");
    if (savedSongs) {
      const parsedSongs = JSON.parse(savedSongs);
      setAllSongs(parsedSongs);
    } setAllSongs(JSON.parse(savedSongs));

    // cargar tema guardado o dark por defecto
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleLoginSuccess = (usuarioLoggeado) => {
    setSessionActive(true);
    setUser(usuarioLoggeado);
  };

  const handleLogout = () => {
    setSessionActive(false);
    localStorage.removeItem("sesion");
    setUser(null);
  };

  // Cambiar tema
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const updateAllSongs = (songs) => {
    setAllSongs(songs);
    localStorage.setItem("songs_global", JSON.stringify(songs));
  };

  // Nueva función para borrar canciones globalmente
  const handleDeleteSong = (songId) => {
    const updatedSongs = allSongs.filter(song => song.id !== songId);
    setAllSongs(updatedSongs);
    localStorage.setItem("songs_global", JSON.stringify(updatedSongs));
  };

  if (!sessionActive) {
    // Muestra el login si no hay sesión
    return <LogIn onLogin={handleLoginSuccess} />;
  }

  return (
    <>
      <NavBar
        user={user}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      {user?.isAdmin && (
        <Dashboard
          user={user}
          allSongs={allSongs}
          onDeleteSong={handleDeleteSong}
        />
      )}
      <Header />
      <Home user={user} allSongs={allSongs} onSongsChange={updateAllSongs}/>
      <Footer />
    </>
  );
}
