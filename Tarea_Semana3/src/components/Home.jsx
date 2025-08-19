import "../styles/Home.css";
import Cards from "./Cards";
import AboutYou from "./AboutYou";
function Home() {
    return (
        <main className="home-content">
            
            <AboutYou />
            <section className="featured">
                <h2>Recomendados para ti</h2>
                <p>Descubre nuevos artistas y álbumes seleccionados especialmente.</p>
                <Cards />
            </section>
        </main>
    );
}

export default Home;
