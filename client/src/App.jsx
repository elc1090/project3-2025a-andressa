import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Tela from "./components/Tela";
import MindMap from "./components/MindMap";
import TelaTeste from "./components/TelaTeste";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tela" element={<Tela />} />
      <Route path="/mapa" element={<MindMap />} />
      <Route path="/mapa/:id" element={<MindMap />} />
      <Route path="/telateste" element={<TelaTeste />} />
    </Routes>
  );
}

export default App;
