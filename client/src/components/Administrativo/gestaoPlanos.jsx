import React, { useEffect, useState } from "react";
import styles from "./gestaoPlanos.module.css";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../services/authService";

const GestaoPlanos = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
    }
  }, [])

  const [planos, setPlanos] = useState([
    { id: 1, nome: "Plano Básico", preco: 99.9, duracao: 1, descricao: "Acesso à academia durante 1 mês." },
    { id: 2, nome: "Plano Mensal Plus", preco: 149.9, duracao: 1, descricao: "Inclui aulas extras e piscina." },
  ]);

  const [form, setForm] = useState({
    id: null,
    nome: "",
    preco: "",
    duracao: "",
    descricao: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [editando, setEditando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErro("");
    setSucesso("");
  };

  const validarFormulario = () => {
    if (!form.nome.trim()) return "Nome do plano é obrigatório";
    if (!form.preco || isNaN(form.preco) || Number(form.preco) <= 0) return "Preço inválido";
    if (!form.duracao || isNaN(form.duracao) || Number(form.duracao) <= 0) return "Duração inválida";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroVal = validarFormulario();
    if (erroVal) {
      setErro(erroVal);
      return;
    }

    if (editando) {
      setPlanos((prev) =>
        prev.map((p) =>
          p.id === form.id
            ? {
              ...p,
              nome: form.nome,
              preco: Number(form.preco),
              duracao: Number(form.duracao),
              descricao: form.descricao,
            }
            : p
        )
      );
      setSucesso("Plano atualizado com sucesso!");
    } else {
      const novoPlano = {
        id: Date.now(),
        nome: form.nome,
        preco: Number(form.preco),
        duracao: Number(form.duracao),
        descricao: form.descricao,
      };
      setPlanos((prev) => [...prev, novoPlano]);
      setSucesso("Plano cadastrado com sucesso!");
    }
    setForm({ id: null, nome: "", preco: "", duracao: "", descricao: "" });
    setEditando(false);
    setErro("");
  };

  const editarPlano = (id) => {
    const plano = planos.find((p) => p.id === id);
    if (plano) {
      setForm({
        id: plano.id,
        nome: plano.nome,
        preco: plano.preco.toString(),
        duracao: plano.duracao.toString(),
        descricao: plano.descricao,
      });
      setEditando(true);
      setErro("");
      setSucesso("");
    }
  };

  const excluirPlano = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este plano?")) {
      setPlanos((prev) => prev.filter((p) => p.id !== id));
      setSucesso("Plano excluído com sucesso!");
      if (editando && form.id === id) {
        setForm({ id: null, nome: "", preco: "", duracao: "", descricao: "" });
        setEditando(false);
      }
    }
  };

  return (
    <div className={styles["container-planos"]}>
      {/* Formulário com título dentro */}
      <form onSubmit={handleSubmit} className={styles["form-planos"]}>
        <h2 className={styles["titulo-principal"]}>Gestão de Planos</h2>

        <div>
          <label htmlFor="nome">Nome do Plano*:</label>
          <input
            id="nome"
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Ex: Plano Mensal"
          />
        </div>

        <div>
          <label htmlFor="preco">Preço (R$)*:</label>
          <input
            id="preco"
            type="number"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            step="0.01"
            placeholder="Ex: 149.90"
          />
        </div>

        <div>
          <label htmlFor="duracao">Duração (meses)*:</label>
          <input
            id="duracao"
            type="number"
            name="duracao"
            value={form.duracao}
            onChange={handleChange}
            min="1"
            placeholder="Ex: 1"
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            placeholder="Descrição do plano"
            rows={3}
          />
        </div>

        {erro && <p className={styles.erro}>{erro}</p>}
        {sucesso && <p className={styles.sucesso}>{sucesso}</p>}

        <button type="submit">{editando ? "Atualizar Plano" : "Cadastrar Plano"}</button>

        {editando && (
          <button
            type="button"
            className={styles["btn-cancelar"]}
            onClick={() => {
              setForm({ id: null, nome: "", preco: "", duracao: "", descricao: "" });
              setEditando(false);
              setErro("");
              setSucesso("");
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Lista dos planos ao lado do formulário */}
      <div className={styles["lista-container"]}>
        <h3>Planos cadastrados</h3>
        {planos.length === 0 && <p>Nenhum plano cadastrado.</p>}
        <ul className={styles["lista-planos"]}>
          {planos.map(({ id, nome, preco, duracao, descricao }) => (
            <li key={id} className={styles["item-plano"]}>
              <div>
                <strong>{nome}</strong> - R$ {preco.toFixed(2)} / {duracao} {duracao === 1 ? "mês" : "meses"}
                <p>{descricao}</p>
              </div>
              <div className={styles.acoes}>
                <button onClick={() => editarPlano(id)} className={styles["btn-editar"]}>
                  Editar
                </button>
                <button onClick={() => excluirPlano(id)} className={styles["btn-excluir"]}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GestaoPlanos;
