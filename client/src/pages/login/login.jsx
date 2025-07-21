import React, { useState } from "react";
import styles from "./login.module.css";
import img1 from "../../assets/img1.png"; // ajuste o caminho conforme seu projeto

const Login = () => {
  const [tipo, setTipo] = useState("administrativo");

  const alternarTipo = () => {
    setTipo((prev) => (prev === "administrativo" ? "cliente" : "administrativo"));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.imagemContainer}>
          <img src={img1} alt="Anúncio" className={styles.imagem} />
          <div className={styles.overlay} />
        </div>

        <div className={styles.formulario}>
          <button className={styles.botaoTrocar} onClick={alternarTipo}>
            Alterar para {tipo === "administrativo" ? "Cliente" : "Administrativo"}
          </button>

          <h2>Login - {tipo === "administrativo" ? "Administrativo" : "Cliente"}</h2>

          <form>
            <div className={styles.grupoInput}>
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" placeholder="seu@email.com" />
            </div>

            <div className={styles.grupoInput}>
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" placeholder="********" />
            </div>

            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
