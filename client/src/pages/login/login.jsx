import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import img1 from "../../assets/img1.png";
import { isAdmin, isAuthenticated, login, saveUserData } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) {
      if (isAdmin()) {
        navigate("/administrativo")
      } else {
        navigate("/cliente")
      }
    }
  }, []);

  const [tipo, setTipo] = useState("administrativo");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);

  const alternarTipo = () => {
    setTipo((prev) => (prev === "administrativo" ? "cliente" : "administrativo"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, tipo);

      if (response && (response.admin || response.cliente)) {
        // Salvar dados do usuário no localStorage
        const userData = response.admin || response.cliente;
        saveUserData(userData, tipo);

        // Navegar para a página apropriada
        navigate(`/${tipo === "administrativo" ? "administrativo" : "cliente"}`);

        console.log("Login bem-sucedido:", response);
        setErro(null);
      }
    } catch (error) {
      console.error("Erro no login:", error);

      if (error.response && error.response.status === 401) {
        setErro("Email não encontrado. Verifique se o email está correto.");
      } else {
        setErro("Erro no servidor. Tente novamente.");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imagemContainer}>
          <img src={img1} alt="Anúncio" className={styles.imagem} />
          <div className={styles.overlay} />
        </div>

        <div className={styles.formulario}>
          <button className={styles.botaoTrocar} onClick={alternarTipo} type="button">
            Alterar para {tipo === "administrativo" ? "Cliente" : "Administrativo"}
          </button>

          <h2>Login - {tipo === "administrativo" ? "Administrativo" : "Cliente"}</h2>

          <form onSubmit={handleSubmit}>
            <div className={styles.grupoInput}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.grupoInput}>
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                placeholder="**"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            {erro && <p style={{ color: "red" }}>{erro}</p>}

            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
