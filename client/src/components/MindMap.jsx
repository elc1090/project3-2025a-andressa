import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./mindmap.css";

function MindMap() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mapaId, setMapaId] = useState(id || null);
  const [mapaNome, setMapaNome] = useState("Meu Mapa Mental");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchMapa = async () => {
      if (id) {
        try {
          const res = await axios.get(`https://project3-2025a-andressa.onrender.com/api/mapas/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setMapaNome(res.data.titulo);
          setNodes(res.data.nodes);
          setEdges(res.data.edges);
          setMapaId(res.data._id);
        } catch (err) {
          console.error("Erro ao carregar mapa:", err);
        }
      } else {
        try {
          const res = await axios.post("https://project3-2025a-andressa.onrender.com/api/mapas/salvar", {
            titulo: "Novo Mapa Mental",
            nodes: [],
            edges: [],
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setMapaId(res.data._id);
          navigate(`/mapa/${res.data._id}`, { replace: true });
        } catch (err) {
          console.error("Erro ao criar novo mapa:", err);
        }
      }
    };

    fetchMapa();
  }, [id]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const addNode = () => {
    const newNode = {
      id: `${+new Date()}`,
      data: { label: "Novo nó" },
      position: { x: Math.random() * 300, y: Math.random() * 300 },
      className: "custom-node",
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const editarTextoDoNo = (nodeId) => {
    const texto = prompt("Digite o novo texto para o nó:");
    if (texto) {
      setNodes((nds) => nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, label: texto } } : node))
      );
    }
  };

  const onNodeDoubleClick = (_, node) => editarTextoDoNo(node.id);

  const salvarMapa = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `https://project3-2025a-andressa.onrender.com/api/mapas/${mapaId}`,
        { titulo: mapaNome, nodes, edges },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Mapa salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar mapa:", err);
      alert(`Erro ao salvar mapa.\nToken usado: ${mapaId}`);
    }
  };

  const excluirMapa = async () => {
    const token = localStorage.getItem("token");
    if (window.confirm("Tem certeza que deseja excluir este mapa?")) {
      try {
        await axios.delete(`https://project3-2025a-andressa.onrender.com/api/mapas/${mapaId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Mapa excluído com sucesso!");
        navigate("/tela");
      } catch (err) {
        console.error(err);
        alert("Erro ao excluir mapa.");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="mindmap-container">
      <div className="mindmap-header">
        <div className="mindmap-header-left">
          <input
            value={mapaNome}
            onChange={(e) => setMapaNome(e.target.value)}
            className="mindmap-input" />
          <Link to="/tela" className="mindmap-button">⬅ Voltar</Link>
          <button onClick={addNode} className="mindmap-button">Adicionar Nó</button>
          <button onClick={salvarMapa} className="mindmap-button">Salvar</button>
          <button onClick={excluirMapa} className="mindmap-button">Excluir</button>
        </div>
        <button onClick={logout} className="mindmap-button">Sair</button>
      </div>

      <div className="mindmap-flow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          fitView
        >
          <MiniMap nodeColor={() => "#8A2BE2"} />
          <Controls />
          <Background color="#222" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default MindMap;
