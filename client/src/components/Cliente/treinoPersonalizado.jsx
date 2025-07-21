import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./treinoPersonalizado.module.css";

const TreinoPersonalizado = () => {
    const [treinos, setTreinos] = useState([]);
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const dados = [
            {
                id: 1,
                nome: "Muay Thai - Condicionamento",
                imagem: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Muay_Thai_pictogram.svg",
                descricao: "Foco em resistência física e técnica de golpes.",
                exercicios: ["Corrida - 10 min", "Sombra - 3 rounds", "Joelhadas - 4x10"]
            },
            {
                id: 2,
                nome: "Jiu-Jitsu - Fundamentos",
                imagem: "https://upload.wikimedia.org/wikipedia/commons/c/c4/BJJ_White_Belt.svg",
                descricao: "Movimentação no solo e finalizações básicas.",
                exercicios: ["Drills - 5 min", "Guardas - 3x5 min"]
            },
            {
                id: 3,
                nome: "Boxe - Técnica e Cardio",
                imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFzCVcXgPapeM3P1NGOGJDaKCzqxwYgIyzgw&s",
                descricao: "Condicionamento e técnica de socos.",
                exercicios: ["Pular corda", "Jab/Direto", "Abdominais"]
            },
            {
                id: 4,
                nome: "MMA - Treino Completo",
                imagem: "https://upload.wikimedia.org/wikipedia/commons/6/6d/MMA_pictogram_2.svg",
                descricao: "Striking + grappling + solo.",
                exercicios: ["Sombra", "Combinações", "Quedas"]
            },
            {
                id: 5,
                nome: "Karatê - Kata",
                imagem: "https://storage.needpix.com/rsynced_images/karate-3615008_1280.png",
                descricao: "Treino técnico de katas tradicionais.",
                exercicios: ["Kata Heian 1 a 3", "Sequência kihon", "Postura"]
            },
            {
                id: 6,
                nome: "Jiu-Jitsu - Avançado",
                imagem: "https://upload.wikimedia.org/wikipedia/commons/c/c4/BJJ_White_Belt.svg",
                descricao: "Treino técnico e rola livre.",
                exercicios: ["Drill passagem", "Arm-lock", "Raspagens"]
            },
            {
                id: 7,
                nome: "Muay Thai - Sparring Leve",
                imagem: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Muay_Thai_pictogram.svg",
                descricao: "Treino simulado com controle.",
                exercicios: ["Sombra", "Sparring 3 rounds"]
            },
            {
                id: 8,
                nome: "Boxe - Esquiva e Defesa",
                imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFzCVcXgPapeM3P1NGOGJDaKCzqxwYgIyzgw&s",
                descricao: "Foco em movimentação defensiva.",
                exercicios: ["Esquiva lateral", "Rolar cintura"]
            },
            {
                id: 9,
                nome: "MMA - Treino Estratégico",
                imagem: "https://upload.wikimedia.org/wikipedia/commons/6/6d/MMA_pictogram_2.svg",
                descricao: "Transições entre trocação e solo.",
                exercicios: ["Golpes + queda", "Controle e finalização"]
            },
            {
                id: 10,
                nome: "Karatê - Defesa Pessoal",
                imagem: "https://storage.needpix.com/rsynced_images/karate-3615008_1280.png",
                descricao: "Aplicação prática de técnicas defensivas.",
                exercicios: ["Defesas com bloqueio", "Contra-ataque"]
            }
        ];
        setTreinos(dados);
    }, []);

    const toggleFavorito = (id) => {
        setFavoritos((prev) =>
            prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
        );
    };

    const iniciarTreino = (id) => {
        alert("Treino iniciado!")
    };

    return (
        <section className={style.view}>
            <div className={style.ui}>
                <h3>Treinos Personalizados - Artes Marciais</h3>
                <div className={style.lista}>
                    {treinos.map(treino => (
                        <div key={treino.id} className={style.card}>
                            <img src={treino.imagem} alt={treino.nome} className={style.imagem} />
                            <div className={style.cardContent}>
                                <div className={style.cardHeader}>
                                    <h4>{treino.nome}</h4>
                                    <button
                                        className={style.favBtn}
                                        onClick={() => toggleFavorito(treino.id)}
                                    >
                                        {favoritos.includes(treino.id) ? "★" : "☆"}
                                    </button>
                                </div>
                                <p>{treino.descricao}</p>
                                <ul>
                                    {treino.exercicios.map((ex, idx) => (
                                        <li key={idx}>{ex}</li>
                                    ))}
                                </ul>
                                <button
                                    className={style.startBtn}
                                    onClick={() => iniciarTreino(treino.id)}
                                >
                                    Iniciar Treino
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TreinoPersonalizado;
