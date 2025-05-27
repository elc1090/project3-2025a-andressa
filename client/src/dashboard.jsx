import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [mapas, setMapas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMapas = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/mapas", {
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
  <div style={{ height: "100vh", backgroundColor: "#000", color: "#fff" }}>
    <div style={{
      height: "60px",
      backgroundColor: "#111",
      borderBottom: "2px solid #8A2BE2",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
    }}>
      <h2 style={{ color: "#8A2BE2" }}>Seus Mapas Mentais</h2>
      <button onClick={logout} style={botaoEstilizado}>Sair</button>
    </div>

    {/* Botão Criar */}
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate("/mapa")} style={botaoEstilizado}>
        ➕ Criar Mapa Mental
      </button>
    </div>

    {/* Lista de Mapas */}
    <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {mapas.map((mapa) => (
        <div
          key={mapa._id}
          onClick={() => navigate(`/mapa/${mapa._id}`)}
          style={cardMapaEstilo}
        >
          <h3>{mapa.titulo}</h3>
        </div>
      ))}
    </div>
  </div>
);
};

const botaoEstilizado = {
  backgroundColor: "transparent",
  border: "1px solid #8A2BE2",
  color: "#8A2BE2",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};

const cardMapaEstilo = {
  border: "2px solid #8A2BE2",
  borderRadius: "10px",
  padding: "20px",
  width: "220px",
  backgroundColor: "#111",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
  textAlign: "center",
  boxShadow: "0 0 0 transparent",
};

cardMapaEstilo["&:hover"] = {
  transform: "scale(1.05)",
  boxShadow: "0 0 10px #8A2BE2",
};

export default Dashboard;
