import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tela.css";

function Tela() {
  const [mapas, setMapas] = useState([]);

  useEffect(() => {
    const fetchMapas = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("https://project3-2025a-andressa.onrender.com/api/mapas", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMapas(res.data);
      } catch (err) {
        console.error("Erro ao carregar mapas:", err);
      }
    };

    fetchMapas();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const irParaCriarMapa = () => {
    window.location.href = "/mapa";
  };

  const irParaMapaEspecifico = (id) => {
    window.location.href = `/mapa/${id}`;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-titulo">Seus Mapas Mentais</h2>
        <button onClick={logout} className="dashboard-botao">Sair</button>
      </div>

      <div className="dashboard-criar">
        <button onClick={irParaCriarMapa} className="dashboard-botao">
          ➕ Criar Mapa Mental
        </button>
      </div>

      <div className="dashboard-lista">
        {mapas.map((mapa) => (
          <div
            key={mapa._id}
            onClick={() => irParaMapaEspecifico(mapa._id)}
            className="dashboard-card"
          >
            <h3>{mapa.titulo}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tela;
