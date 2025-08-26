import "../styles/Home.css";
import Cards from "./Cards";
import AboutYou from "./AboutYou";
import ToDo from "./ToDo";
function Home({user}) {
    return (
        <main className="home-content">
            <div className="sections-container">
            <AboutYou />
            <ToDo user={user}/>
            </div>
            <section className="featured">
                <h2>Recomendados para ti</h2>
                <p>Descubre nuevos artistas y álbumes seleccionados especialmente.</p>
                <Cards />
            </section>
        </main>
    );
}

export default Home;
