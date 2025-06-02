import { useState } from "react";
import axios from "axios"; 
import './style.css';
import { Link } from 'react-router-dom';

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://project3-2025a-andressa.onrender.com/api/auth/register", {
        nome,
        email,
        senha,
      });

      // Se chegou aqui, o cadastro foi bem-sucedido
      setMensagem("Cadastro realizado com sucesso!");
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        // O servidor respondeu com erro
        setMensagem(err.response.data.msg || "Erro ao cadastrar");
      } else {
        // Erro de rede ou outro
        setMensagem("Erro de conexão com o servidor.");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Cadastro</h2>
        <form className="auth-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <br />
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
          <button type="submit">Cadastrar</button>
        </form>
        <p>{mensagem}</p>
        <p className="auth-footer">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );

}

export default Register;
