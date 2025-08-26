import "../styles/NavBar.css";
import logo from "../images/logo.png";
export default function NavBar({ user, onLogout, theme, toggleTheme }) {
    return (
        <nav className="navbar">
            <div className="logo"> <img src={logo} alt="Logo" /> <h1>KnowYourTunes</h1> </div>
            <ul className="menu">
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Canciones</a></li>
                <li><a href="#">Álbumes</a></li>
                <li><a href="#">Artistas</a></li>
            </ul>
            <div className="usuario-container">
                <button onClick={toggleTheme} aria-label="Cambiar tema">{theme === "light" ? "☀️" : "🌑"}</button>
                <div className="user-profile"> <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Usuario" /> </div>
                <div className="usuario">
                    {user?.usuario ? (
                        <>
                            <span style={{ margin: 8 }}> {user.usuario}</span>
                            <button onClick={onLogout}>Cerrar sesión</button>
                        </>
                    ) : null}
                </div>
            </div>

        </nav>
    );
}
