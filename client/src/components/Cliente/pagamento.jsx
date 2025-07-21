import React, { useState } from "react";
import style from "./pagamento.module.css";

const planos = [
    {
        id: 1,
        nome: "Básico",
        preco: "R$ 99,90",
        beneficios: ["Acesso geral"],
    },
    {
        id: 2,
        nome: "Intermediário",
        preco: "R$ 149,90",
        beneficios: ["Aulas em grupo", "Avaliação mensal"],
    },
    {
        id: 3,
        nome: "Premium",
        preco: "R$ 199,90",
        beneficios: ["Personal", "Todas as modalidades"],
    },
    {
        id: 4,
        nome: "VIP",
        preco: "R$ 299,90",
        beneficios: ["Nutricionista", "Coaching extra"],
    },
];

const formasPagamentoIniciais = [
    { id: 1, tipo: "Cartão de Crédito", numero: "**** **** **** 1234", nome: "Visa" },
    { id: 2, tipo: "Cartão de Débito", numero: "**** **** **** 5678", nome: "MasterCard" },
];

const Pagamento = () => {
    const [formasPagamento, setFormasPagamento] = useState(formasPagamentoIniciais);
    const [modalAberto, setModalAberto] = useState(false);
    const [novoCartao, setNovoCartao] = useState({
        tipo: "Cartão de Crédito",
        numero: "",
        nome: "",
    });
    const [assinaturaAtiva, setAssinaturaAtiva] = useState(2);
    const [diasRestantes, setDiasRestantes] = useState(15);

    const abrirModal = () => setModalAberto(true);
    const fecharModal = () => setModalAberto(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoCartao({ ...novoCartao, [name]: value });
    };

    const adicionarCartao = (e) => {
        e.preventDefault();
        if (!novoCartao.numero || !novoCartao.nome) return alert("Preencha todos os campos");
        const novo = {
            id: Date.now(),
            tipo: novoCartao.tipo,
            numero: "**** **** **** " + novoCartao.numero.slice(-4),
            nome: novoCartao.nome,
        };
        setFormasPagamento([...formasPagamento, novo]);
        setNovoCartao({ tipo: "Cartão de Crédito", numero: "", nome: "" });
        fecharModal();
    };

    const renovarAssinatura = () => {
        alert("Assinatura renovada com sucesso!");
        setDiasRestantes(30);
    };

    return (
        <section className={style.view}>
            <div className={style.ui}>
                <div className={style.option}>
                    <h3>Formas de Pagamento Cadastradas</h3>
                    <button onClick={abrirModal} className={style.botaoModal}>
                        Adicionar Novo Cartão
                    </button>
                </div>
                <ul className={style.formasList}>
                    {formasPagamento.map((fp) => (
                        <li key={fp.id} className={style.forma}>
                            <strong>{fp.tipo}:</strong> {fp.numero} - {fp.nome}
                        </li>
                    ))}
                </ul>

                {modalAberto && (
                    <div className={style.modalOverlay} onClick={fecharModal}>
                        <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                            <h3>Adicionar Cartão</h3>
                            <form onSubmit={adicionarCartao} className={style.formCartao}>
                                <label>
                                    Tipo:
                                    <select
                                        name="tipo"
                                        value={novoCartao.tipo}
                                        onChange={handleInputChange}
                                    >
                                        <option>Cartão de Crédito</option>
                                        <option>Cartão de Débito</option>
                                    </select>
                                </label>
                                <label>
                                    Número do cartão:
                                    <input
                                        name="numero"
                                        type="text"
                                        maxLength="16"
                                        value={novoCartao.numero}
                                        onChange={handleInputChange}
                                        placeholder="Digite os 16 dígitos"
                                        required
                                    />
                                </label>
                                <label>
                                    Nome no cartão:
                                    <input
                                        name="nome"
                                        type="text"
                                        value={novoCartao.nome}
                                        onChange={handleInputChange}
                                        placeholder="Nome completo"
                                        required
                                    />
                                </label>
                                <div className={style.botoes}>
                                    <button type="submit">Salvar</button>
                                    <button type="button" onClick={fecharModal}>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <section className={style.assinaturas}>
                    <h3>Planos de Assinatura</h3>
                    <div className={style.planosGrid}>
                        {planos.map((plano) => {
                            const ativo = assinaturaAtiva === plano.id;
                            return (
                                <div
                                    key={plano.id}
                                    className={`${style.plano} ${ativo ? style.ativo : ""}`}
                                >
                                    <h4>{plano.nome}</h4>
                                    <p className={style.preco}>{plano.preco}</p>
                                    <ul>
                                        {plano.beneficios.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                    {ativo && (
                                        <div className={style.ativoInfo}>
                                            <p>
                                                <strong>Assinatura ativa</strong>
                                            </p>
                                            <p>Dias restantes: {diasRestantes}</p>
                                            <button onClick={renovarAssinatura} className={style.botaoRenovar}>
                                                Renovar Assinatura
                                            </button>
                                        </div>
                                    )}
                                    {!ativo && (
                                        <button
                                            className={style.botaoAtivar}
                                            onClick={() => {
                                                setAssinaturaAtiva(plano.id);
                                                setDiasRestantes(30);
                                            }}
                                        >
                                            Ativar Plano
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Pagamento;
