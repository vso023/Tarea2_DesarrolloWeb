import "../styles/Footer.css";

function Footer() {
    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <h2>KnowYourTunes</h2>
                    </div>
                </div>
                <p className="footer-copy">&copy; 2025 KnowYourTunes. Todos los derechos reservados.</p>
                <div className="contacto">
                    <a>Contacto</a> | <a href="">Términos de servicio</a> | <a href="">Política de privacidad</a>
                    <p>Telefono: 123456</p>

                </div>
            </footer>
        </>
    );
}
export default Footer;
