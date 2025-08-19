import { useState } from "react";
import "../styles/AboutYou.css";

export default function AboutYou() {
    const [generoFav, setGeneroFav] = useState("");
    const [artistaFav, setArtistaFav] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Guardar datos en localStorage
        const datos = {generoFav, artistaFav };
        localStorage.setItem("aboutYou", JSON.stringify(datos));

        setMensaje("¡Gracias por compartir tus melodías!");
        
        // reset form
        setGeneroFav("");
        setArtistaFav("");
    };

    return (
        <section className="about_you">
            <h2>Cuéntanos sobre tus melodías</h2>
            <p>Completa este cuestionario para hacernos saber tus gustos musicales.</p>

            <form onSubmit={handleSubmit} className="about_form">
                <div>
                    <input
                        type="text"
                        placeholder="Género musical favorito"
                        value={generoFav}
                        onChange={(e) => setGeneroFav(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Artista favorito"
                        value={artistaFav}
                        onChange={(e) => setArtistaFav(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Guardar respuestas</button>
            </form>

            {mensaje && <p className="mensaje">{mensaje}</p>}
        </section>
    );
}
