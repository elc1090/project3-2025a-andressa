import React from "react";
import 'react-router-dom';

function TelaTeste() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Teste de Deploy</h1>
      <p style={styles.text}>Se você está vendo esta tela, o Vercel está funcionando! 🎉</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: "2rem",
    color: "#0070f3",
  },
  text: {
    fontSize: "1.2rem",
    marginTop: "1rem",
  },
};

export default TelaTeste;
