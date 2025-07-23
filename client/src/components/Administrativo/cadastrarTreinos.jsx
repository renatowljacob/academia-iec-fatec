import React, { useState, useEffect } from "react";
import styles from "./cadastrarTreinos.module.css";
import { createTreino } from "../../services/treinoService";
import { getAllClientes } from "../../services/clienteService";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../services/authService";

const diasSemana = [
  { label: "Segunda", value: "segunda" },
  { label: "Terça", value: "terca" },
  { label: "Quarta", value: "quarta" },
  { label: "Quinta", value: "quinta" },
  { label: "Sexta", value: "sexta" },
  { label: "Sábado", value: "sabado" },
  { label: "Domingo", value: "domingo" },
];

const CadastrarTreinos = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
    }
  }, [])

  const [treino, setTreino] = useState({
    cliente_id: "",
    nome: "",
    descricao: "",
    dia_semana: "",
  });

  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesData = await getAllClientes();
        setClientes(clientesData);
      } catch (err) {
        console.error("Erro ao buscar clientes:", err);
        setErro("Erro ao carregar lista de clientes");
      }
    };

    fetchClientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTreino({ ...treino, [name]: value });
    setErro("");
    setSucesso("");
  };

  const validarCampos = () => {
    if (!treino.cliente_id) return "Selecione um cliente";
    if (!treino.nome.trim()) return "Nome do treino é obrigatório";
    if (!treino.dia_semana) return "Escolha um dia da semana";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroValidacao = validarCampos();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    try {
      await createTreino(treino);
      setSucesso("Treino cadastrado com sucesso!");
      setErro("");
      setTreino({
        cliente_id: "",
        nome: "",
        descricao: "",
        dia_semana: "",
      });
    } catch (err) {
      console.error("Erro ao cadastrar treino:", err);
      setErro("Erro ao cadastrar treino.");
      setSucesso("");
    }
  };

  return (
    <div className={styles["container-treino"]}>
      <h2>Cadastrar Treino</h2>
      <form onSubmit={handleSubmit} className={styles["form-treino"]}>
        <div>
          <label htmlFor="cliente_id">Cliente*:</label>
          <select
            id="cliente_id"
            name="cliente_id"
            value={treino.cliente_id}
            onChange={handleChange}
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome} - {cliente.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="nome">Nome do treino*:</label>
          <input
            id="nome"
            type="text"
            name="nome"
            value={treino.nome}
            onChange={handleChange}
            placeholder="Ex: Treino de força"
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={treino.descricao}
            onChange={handleChange}
            placeholder="Descreva o treino"
          />
        </div>

        <div>
          <label htmlFor="dia_semana">Dia da semana*:</label>
          <select
            id="dia_semana"
            name="dia_semana"
            value={treino.dia_semana}
            onChange={handleChange}
          >
            <option value="">Selecione um dia</option>
            {diasSemana.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {erro && <p className={styles.erro}>{erro}</p>}
        {sucesso && <p className={styles.sucesso}>{sucesso}</p>}

        <button type="submit" disabled={!!validarCampos()}>
          Cadastrar Treino
        </button>
      </form>
    </div>
  );
};

export default CadastrarTreinos;
