import "../styles/Header.css";
import logo from "../images/logo.png";

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Logo" />
                <h1>KnowYourTunes</h1>
            </div>

            <nav className="nav">
                <ul>
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Canciones</a></li>
                    <li><a href="#">Álbumes</a></li>
                    <li><a href="#">Artistas</a></li>
                </ul>
            </nav>

            <div className="user-profile">
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                    alt="Usuario"
                />
            </div>
        </header>
    );
}

export default Header;
