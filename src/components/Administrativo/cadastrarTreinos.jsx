import React, { useState } from "react";
import styles from "./cadastrarTreinos.module.css";

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
  const [treino, setTreino] = useState({
    nome: "",
    descricao: "",
    duracao: "",
    intensidade: "",
    dias: [],
    status: "ativo",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "dias") {
      let novosDias = [...treino.dias];
      if (checked) {
        novosDias.push(value);
      } else {
        novosDias = novosDias.filter((dia) => dia !== value);
      }
      setTreino({ ...treino, dias: novosDias });
      setErro("");
      setSucesso("");
      return;
    }

    setTreino({ ...treino, [name]: value });
    setErro("");
    setSucesso("");
  };

  const validarCampos = () => {
    if (!treino.nome.trim()) return "Nome do treino é obrigatório";
    if (!treino.duracao.trim()) return "Duração é obrigatória";
    if (isNaN(treino.duracao) || Number(treino.duracao) <= 0)
      return "Duração deve ser um número positivo";
    if (!treino.intensidade) return "Intensidade é obrigatória";
    if (treino.dias.length === 0) return "Escolha pelo menos um dia da semana";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const erroValidacao = validarCampos();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    // Simulação de salvar
    console.log("Treino cadastrado:", treino);
    setSucesso("Treino cadastrado com sucesso!");
    setErro("");
    setTreino({
      nome: "",
      descricao: "",
      duracao: "",
      intensidade: "",
      dias: [],
      status: "ativo",
    });
  };

  return (
    <div className={styles["container-treino"]}>
      <h2>Cadastrar Treino</h2>
      <form onSubmit={handleSubmit} className={styles["form-treino"]}>
        <label htmlFor="nome">Nome do treino*:</label>
        <input
          id="nome"
          type="text"
          name="nome"
          value={treino.nome}
          onChange={handleChange}
          placeholder="Ex: Treino de força"
        />

        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          name="descricao"
          value={treino.descricao}
          onChange={handleChange}
          placeholder="Descreva o treino"
        />

        <label htmlFor="duracao">Duração (minutos)*:</label>
        <input
          id="duracao"
          type="number"
          name="duracao"
          value={treino.duracao}
          onChange={handleChange}
          placeholder="Ex: 60"
          min="1"
        />

        <label htmlFor="intensidade">Intensidade*:</label>
        <select
          id="intensidade"
          name="intensidade"
          value={treino.intensidade}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="leve">Leve</option>
          <option value="moderada">Moderada</option>
          <option value="intensa">Intensa</option>
        </select>

        <fieldset className={styles["fieldset-dias"]}>
          <legend>Dias da semana*:</legend>
          <div className={styles["checkbox-group"]}>
            {diasSemana.map(({ label, value }) => (
              <label key={value} className={styles["checkbox-label"]}>
                <input
                  type="checkbox"
                  name="dias"
                  value={value}
                  checked={treino.dias.includes(value)}
                  onChange={handleChange}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={treino.status}
          onChange={handleChange}
        >
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>

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
