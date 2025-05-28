import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://project3-2025a-andressa.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await res.json();

      if (res.ok) {
        // Salvar token no localStorage
        localStorage.setItem("token", data.token);
        setMensagem("Login realizado com sucesso!");
        // Redirecionar ou mostrar outra tela
        window.location.href = "/telateste";
      } else {
        setMensagem(data.msg || "Erro no login");
      }
    } catch (err) {
      console.error(err);
      setMensagem("Erro de conexão com o servidor.");
    }
  };


return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Entrar</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <br />
        <button type="submit">Entrar</button>
        </form>
        <p className="auth-footer">
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
