import React, { useEffect, useState } from "react";
import styles from "./cadastrarCliente.module.css";
import { createCliente } from "../../services/clienteService";
import { isAdmin } from "../../services/authService";

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
        email: cliente.email,
        telefone: cliente.telefone,
        data_nascimento: cliente.dataNascimento
      };

      const response = await createCliente(clienteData);

      if (response) {
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
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
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
          />
        </div>

        <div>
          <label htmlFor="plano">Plano escolhido*:</label>
          <input
            id="plano"
            type="text"
            name="plano"
            value={cliente.plano}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="dataInicioPlano">Data de início do plano:</label>
          <input
            id="dataInicioPlano"
            type="date"
            name="dataInicioPlano"
            value={cliente.dataInicioPlano}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="observacoes">Observações / restrições:</label>
          <textarea
            id="observacoes"
            name="observacoes"
            value={cliente.observacoes}
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
