import React, { useState } from "react";
import styles from "./login.module.css";
import img1 from "../../assets/img1.png";
import { login } from "../../services/auth"; // ✅ importando o serviço

const Login = () => {
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
<<<<<<< HEAD
      const response = await axios.post("/clientes", {
        email: email,
        password: senha,
        tipo: tipo,
      });

      console.log("Login bem-sucedido:", response.data);
||||||| 9a3db72
      const response = await axios.post("/admins", {
        email: email,
        password: senha,
        tipo: tipo,
      });

      console.log("Login bem-sucedido:", response.data);
=======
      const data = await login(email, senha, tipo); // ✅ usando o serviço login
      console.log("Login bem-sucedido:", data);
>>>>>>> ce597a92c94e107a21dfac045af6cb2bec3c0f88
      setErro(null);

      // redirecionamento se quiser:
      // navigate(tipo === "cliente" ? "/cliente" : "/administrativo");

    } catch (error) {
      console.error("Erro no login:", error);
      setErro("Falha no login. Verifique seu email e senha.");
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
                placeholder="********"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
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
