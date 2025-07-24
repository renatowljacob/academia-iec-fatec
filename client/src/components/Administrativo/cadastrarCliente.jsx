import React, { useEffect, useState } from "react";
import styles from "./cadastrarCliente.module.css";
import { createCliente } from "../../services/clienteService";
import { isAdmin } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const validarEmail = (email) => {
  return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(email.trim());
};

const validarCPF = (cpf) => {
  const cpfLimpo = cpf.replace(/\D/g, "");
  return /^\d{11}$/.test(cpfLimpo);
};

const CadastrarCliente = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
    }
  }, [])

  const [cliente, setCliente] = useState({
    nome: "",
    dataNascimento: "",
    cpf: "",
    email: "",
    endereco: "",
    telefone: "",
    status: "ativo",
    plano: "basico",
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
    if (!validarEmail(cliente.email)) return "Email é obrigatório";
    if (!cliente.endereco.trim()) return "Endereco é obrigatório";
    if (!validarCPF(cliente.cpf)) return "CPF inválido (deve ter 11 números)";
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
      const clienteData = {
        nome: cliente.nome,
        data_nascimento: cliente.dataNascimento,
        cpf: cliente.cpf,
        email: cliente.email,
        endereco: cliente.endereco,
        telefone: cliente.telefone,
        status: cliente.status,
        plano: cliente.plano,
      };

      const response = await createCliente(clienteData);

      if (response) {
        setErro("");
        setCliente({
          nome: "",
          dataNascimento: "",
          cpf: "",
          email: "",
          endereco: "",
          telefone: "",
          status: "ativo",
          plano: "basico",
        });
        setSucesso("Cliente cadastrado com sucesso!");
      }

      console.log("Cliente cadastrado:", response);
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      setErro("Falha ao cadastrar cliente. Tente novamente.");
    }
  };

  return (
    <div className={styles["container-cadastro"]}>
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit} className={styles["form-cadastro"]}>
        <div>
          <label htmlFor="nome">Nome completo*:</label>
          <input
            id="nome"
            type="text"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="dataNascimento">Data de nascimento:</label>
          <input
            id="dataNascimento"
            type="date"
            name="dataNascimento"
            value={cliente.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>

        <div>
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
        </div>

        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="endereco">Endereço:</label>
          <input
            id="endereco"
            type="text"
            name="endereco"
            value={cliente.endereco}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="telefone">Telefone/WhatsApp:</label>
          <input
            id="telefone"
            type="tel"
            name="telefone"
            value={cliente.telefone}
            onChange={handleChange}
          />
        </div>

        <div>
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
        </div>

        <div>
          <label htmlFor="plano">Plano escolhido:</label>
          <select
            id="plano"
            name="plano"
            value={cliente.plano}
            onChange={handleChange}
          >
            <option value="basico">Plano Básico</option>
            <option value="plus">Plano Mensal Plus</option>
          </select>
        </div>

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
