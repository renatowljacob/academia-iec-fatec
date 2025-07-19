import React, { useState } from "react";
import styles from "./cadastrarCliente.module.css";

const validarCPF = (cpf) => {
  const cpfLimpo = cpf.replace(/\D/g, "");
  return /^\d{11}$/.test(cpfLimpo);
};

const CadastrarCliente = () => {
  const [cliente, setCliente] = useState({
    nome: "",
    dataNascimento: "",
    cpf: "",
    telefone: "",
    email: "",
    endereco: "",
    plano: "",
    dataInicioPlano: "",
    observacoes: "",
    status: "ativo",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
    setErro("");
    setSucesso("");
  };

  const validarCampos = () => {
    if (!cliente.nome.trim()) return "Nome é obrigatório";
    if (!cliente.cpf.trim()) return "CPF é obrigatório";
    if (!validarCPF(cliente.cpf)) return "CPF inválido (deve ter 11 números)";
    if (!cliente.plano.trim()) return "Plano é obrigatório";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const erroValidacao = validarCampos();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    // Aqui você pode integrar backend para salvar os dados

    console.log("Cliente cadastrado:", cliente);
    setSucesso("Cliente cadastrado com sucesso!");
    setErro("");
    setCliente({
      nome: "",
      dataNascimento: "",
      cpf: "",
      telefone: "",
      email: "",
      endereco: "",
      plano: "",
      dataInicioPlano: "",
      observacoes: "",
      status: "ativo",
    });
  };

  return (
    <div className={styles["container-cadastro"]}>
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit} className={styles["form-cadastro"]}>
        <label htmlFor="nome">Nome completo*:</label>
        <input
          id="nome"
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
          required
        />

        <label htmlFor="dataNascimento">Data de nascimento:</label>
        <input
          id="dataNascimento"
          type="date"
          name="dataNascimento"
          value={cliente.dataNascimento}
          onChange={handleChange}
        />

        <label htmlFor="cpf">CPF*:</label>
        <input
          id="cpf"
          type="text"
          name="cpf"
          value={cliente.cpf}
          onChange={handleChange}
          maxLength={11}
          required
        />

        <label htmlFor="telefone">Telefone/WhatsApp:</label>
        <input
          id="telefone"
          type="tel"
          name="telefone"
          value={cliente.telefone}
          onChange={handleChange}
        />

        <label htmlFor="email">E-mail:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={cliente.email}
          onChange={handleChange}
        />

        <label htmlFor="endereco">Endereço:</label>
        <input
          id="endereco"
          type="text"
          name="endereco"
          value={cliente.endereco}
          onChange={handleChange}
        />

        <label htmlFor="plano">Plano escolhido*:</label>
        <input
          id="plano"
          type="text"
          name="plano"
          value={cliente.plano}
          onChange={handleChange}
          required
        />

        <label htmlFor="dataInicioPlano">Data de início do plano:</label>
        <input
          id="dataInicioPlano"
          type="date"
          name="dataInicioPlano"
          value={cliente.dataInicioPlano}
          onChange={handleChange}
        />

        <label htmlFor="observacoes">Observações / restrições:</label>
        <textarea
          id="observacoes"
          name="observacoes"
          value={cliente.observacoes}
          onChange={handleChange}
        />

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={cliente.status}
          onChange={handleChange}
        >
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>

        {erro && <p className={styles.erro}>{erro}</p>}
        {sucesso && <p className={styles.sucesso}>{sucesso}</p>}

        <button type="submit" disabled={!!validarCampos()}>
          Cadastrar Cliente
        </button>
      </form>
    </div>
  );
};

export default CadastrarCliente;
