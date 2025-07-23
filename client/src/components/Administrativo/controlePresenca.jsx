import React, { useState, useEffect } from "react";
import styles from "./controlePresenca.module.css";
import { getAllClientes } from "../../services/clienteService";
import { getAllAgendamentos, markPresenca } from "../../services/agendamentoService";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../services/authService";

const ControlePresenca = () => {
  const [presencas, setPresencas] = useState({}); // { idCliente: boolean }
  const [msg, setMsg] = useState("");
  const [clientes, setClientes] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
    }
  }, [])

  useEffect(() => {
    loadClientes();
    loadAgendamentos();
  }, [selectedDate]);

  const loadClientes = async () => {
    try {
      const data = await getAllClientes();
      setClientes(data);
    } catch (err) {
      console.error("Erro ao carregar clientes:", err);
      setError("Erro ao carregar lista de clientes");
    }
  };

  const loadAgendamentos = async () => {
    try {
      const data = await getAllAgendamentos();
      // Filtrar por data selecionada
      const agendamentosData = data.filter(ag => {
        const agendamentoDate = new Date(ag.data).toISOString().split('T')[0];
        return agendamentoDate === selectedDate;
      });
      setAgendamentos(agendamentosData);
    } catch (err) {
      console.error("Erro ao carregar agendamentos:", err);
      setError("Erro ao carregar agendamentos");
    }
  };

  const handleToggle = (id) => {
    setPresencas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setMsg("");
  };

  const salvarPresenca = async () => {
    try {
      // Salvar presença para cada agendamento
      const promises = agendamentos.map(async (agendamento) => {
        const presente = !!presencas[agendamento.cliente_id];
        return await markPresenca(agendamento.id, presente);
      });

      await Promise.all(promises);
      setMsg("Presenças salvas com sucesso!");
      setError("");
    } catch (err) {
      console.error("Erro ao salvar presenças:", err);
      setError("Erro ao salvar presenças");
      setMsg("");
    }
  };

  return (
    <div className={styles["container-presenca"]}>
      <h2>Controle de Presença</h2>

      <div className={styles["date-selector"]}>
        <label htmlFor="date">Selecionar data:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul className={styles["lista-clientes"]}>
        {agendamentos.map((agendamento) => {
          const cliente = clientes.find(c => c.id === agendamento.cliente_id);
          if (!cliente) return null;

          return (
            <li key={agendamento.id} className={styles["item-cliente"]}>
              <label>
                <input
                  type="checkbox"
                  checked={!!presencas[cliente.id]}
                  onChange={() => handleToggle(cliente.id)}
                />
                {cliente.nome} - Agendamento #{agendamento.id}
              </label>
            </li>
          );
        })}
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
