import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./tela.css";

const Dashboard = () => {
  const [mapas, setMapas] = useState([]);
  const navigate = useNavigate();

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
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-titulo">Seus Mapas Mentais</h2>
        <button onClick={logout} className="dashboard-botao">Sair</button>
      </div>

      <div className="dashboard-criar">
        <button onClick={() => navigate("/mapa")} className="dashboard-botao">
          ➕ Criar Mapa Mental
        </button>
      </div>

      <div className="dashboard-lista">
        {mapas.map((mapa) => (
          <div
            key={mapa._id}
            onClick={() => navigate(`/mapa/${mapa._id}`)}
            className="dashboard-card"
          >
            <h3>{mapa.titulo}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tela;
