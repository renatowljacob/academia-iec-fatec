import React, { useState } from "react";
import styles from "./controlePresenca.module.css";

// Exemplo simples de clientes (em app real, vem do backend)
const clientesExemplo = [
  { id: 1, nome: "Ana Silva" },
  { id: 2, nome: "Bruno Souza" },
  { id: 3, nome: "Carlos Oliveira" },
  { id: 4, nome: "Diana Costa" },
];

const ControlePresenca = () => {
  const [presencas, setPresencas] = useState({}); // { idCliente: boolean }
  const [msg, setMsg] = useState("");

  const handleToggle = (id) => {
    setPresencas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setMsg("");
  };

  const salvarPresenca = () => {
    // Aqui você faria a chamada para salvar no backend
    console.log("Presenças salvas:", presencas);
    setMsg("Presenças salvas com sucesso!");
  };

  return (
    <div className={styles["container-presenca"]}>
      <h2>Controle de Presença</h2>

      <ul className={styles["lista-clientes"]}>
        {clientesExemplo.map(({ id, nome }) => (
          <li key={id} className={styles["item-cliente"]}>
            <label>
              <input
                type="checkbox"
                checked={!!presencas[id]}
                onChange={() => handleToggle(id)}
              />
              {nome}
            </label>
          </li>
        ))}
      </ul>

      <button
        onClick={salvarPresenca}
        disabled={Object.keys(presencas).length === 0}
      >
        Salvar Presença
      </button>

      {msg && <p className={styles["msg-sucesso"]}>{msg}</p>}
    </div>
  );
};

export default ControlePresenca;
