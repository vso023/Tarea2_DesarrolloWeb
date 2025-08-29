import { useState } from "react";
import "../styles/LogIn.css";

export default function LogIn({ onLogin }) {
    const [usuario, setUsuario] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [clave, setClave] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [registrando, setRegistrando] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Registrar usuario nuevo
         let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        if (registrando) {
            if (usuarios.find(u => u.usuario === usuario)) {
                setMensaje("El usuario ya existe. Elija otro nombre.");
                return;
            }
            const nuevoUsuario = { usuario, clave, isAdmin };
            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            localStorage.setItem("usuario", JSON.stringify({ usuario, clave, isAdmin }));
            setMensaje("Usuario registrado. Ya puede iniciar sesión");
            setRegistrando(false);
            setClave("");
            return;
        }
        const datos = usuarios.find(u => u.usuario === usuario && u.clave === clave);
        if (datos) {
            localStorage.setItem("sesion", "activa");
            localStorage.setItem("usuario_actual", JSON.stringify(datos));
            setMensaje("Bienvenido al sitio web " + usuario);
            onLogin?.(datos); // se pasa el usuario logueado a App
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
                    {registrando && (
                        <div style={{ margin: "0.5rem 0" }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                />
                                Rol de administrador
                            </label>
                        </div>
                    )}

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
