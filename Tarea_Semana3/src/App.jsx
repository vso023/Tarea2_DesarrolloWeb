import { useState, useEffect } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";
import "./App.css";

export default function App() {
  const [sessionActive, setSessionActive] = useState(false);
  const [user, setUser] = useState(null);

  // Tema
  const [theme, setTheme] = useState("dark");

  // Cargamos sesión y tema del localStorage al iniciar
  useEffect(() => {
    const ses = localStorage.getItem("sesion") === "activa";
    const usu = JSON.parse(localStorage.getItem("usuario") || "null");
    setSessionActive(ses);
    setUser(usu);

    // cargar tema guardado o dark por defecto
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleLoginSuccess = () => {
    setSessionActive(true);
    setUser(JSON.parse(localStorage.getItem("usuario") || "null"));
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
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
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
      <Header />
      <Home user={user} />
      <Footer />
    </>
  );
}
