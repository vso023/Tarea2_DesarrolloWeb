import { useState } from "react";
import "../styles/LogIn.css";

export default function LogIn({ onLogin }) {
    const [usuario, setUsuario] = useState("");
    const [clave, setClave] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [registrando, setRegistrando] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Registrar usuario nuevo
        if (registrando) {
            localStorage.setItem("usuario", JSON.stringify({ usuario, clave }));
            setMensaje("Usuario registrado. Ya puede iniciar sesión");
            setRegistrando(false);
            setClave("");
            return;
        }
        const datos = JSON.parse(localStorage.getItem("usuario") || "null");
        if (datos && datos.usuario === usuario && datos.clave === clave) {
            localStorage.setItem("Sesión", "activa");
            setMensaje("Bienvenido al sitio web " + usuario);
            onLogin?.();
        } else {
            setMensaje("Usuario o contraseña incorrecta");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>{registrando ? "Registro" : "Inicio sesión"}</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <div>
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={clave}
                            onChange={(e) => setClave(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">
                        {registrando ? "Registrar" : "Iniciar sesión"}
                    </button>
                </form>
                <button
                    className="toggle-btn"
                    onClick={() => {
                        setRegistrando(!registrando);
                        setMensaje("");
                    }}
                >
                    {registrando ? "Ya está registrado" : "Crear nueva cuenta"}
                </button>
                {mensaje && <p className="login-message">{mensaje}</p>}
            </div>
        </div>
    );
}
