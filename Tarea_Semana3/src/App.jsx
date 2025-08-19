import {useState, useEffect} from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import LogIn from "./components/LogIn";

export default function App() {
  const [sessionActive, setSessionActive] = useState(false)
  const [user, setUser] = useState(null)

  //Cargamos los estados del localStorage al iniciar

  useEffect(() => {
    const ses = localStorage.getItem("sesion") === "activa";
    const usu = JSON.parse(localStorage.getItem("usuario") || "null");
    setSessionActive(ses);
    setUser(usu);
  }, []);
  const handleLoginSucces = () =>{
    setSessionActive(true);
    setUser(JSON.parse(localStorage.getItem("usuario") || "null"));
  };

  const handleLogout = () => {
    setSessionActive(false);
    localStorage.removeItem("sesion");
    setUser(null)
  };

  if(!sessionActive){
    //Muestra el login si no hay sesión
    return <LogIn onLogin={handleLoginSucces}/>



  }
  return (
    <>
      <NavBar user={user} onLogout={handleLogout}/>
      <Header />
      <Home />
      <Footer />
    </>
  );
}
