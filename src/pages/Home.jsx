import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/home.css";

const Home = () => {
  const [nombre, setNombre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      toast.error("El nombre no puede estar vacío");
      return;
    }

    try {
      await axios.post("https://sorteo-backend-eh4q.onrender.com/api/users", {
        nombre,
      });
      toast.success("Usuario agregado con éxito");
      setNombre("");
    } catch (err) {
      if (err.response) {
        if (err.response.data.error === "Sorteo cerrado") {
          toast.error("❌ Sorteo cerrado");
        } else {
          toast.error(`⚠️ ${err.response.data.error}`);
        }
      } else {
        toast.error("Error de conexión con el servidor");
      }
    }
  };
  return (
    <div className="home-container">
      <h2>Participar en el sorteo</h2>
      <form onSubmit={handleSubmit} className="home-form">
        <input
          type="text"
          placeholder="Escribe tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="home-input"
        />
        <button type="submit" className="home-button">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Home;
