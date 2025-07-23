import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./treinoPersonalizado.module.css";
import { getTreinosByCliente } from "../../services/treinoService";
import { getUserData, isCliente } from "../../services/authService";

const TreinoPersonalizado = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isCliente()) {
            navigate("/");
        }
    }, []);

    const [treinos, setTreinos] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const [error, setError] = useState("");

    const userData = getUserData();
    const clienteId = userData?.user?.id;

    useEffect(() => {
        loadTreinos();
        const favoritosLocal = JSON.parse(localStorage.getItem('favoritos') || '[]');
        setFavoritos(favoritosLocal);
    }, []);

    const loadTreinos = async () => {
        if (!clienteId) return;

        try {
            const data = await getTreinosByCliente(clienteId);
            setTreinos(data);
        } catch (err) {
            console.error("Erro ao carregar treinos:", err);
            setError("Erro ao carregar treinos");

            // Usar dados estáticos como fallback se a API falhar
            setTreinos([
                {
                    id: 1,
                    nome: "Muay Thai - Condicionamento",
                    descricao: "Foco em resistência física e técnica de golpes.",
                    exercicios: ["Corrida - 10 min", "Sombra - 3 rounds", "Joelhadas - 4x10"]
                },
                {
                    id: 2,
                    nome: "Jiu-Jitsu - Fundamentos",
                    descricao: "Movimentação no solo e finalizações básicas.",
                    exercicios: ["Drills - 5 min", "Guardas - 3x5 min"]
                },
                {
                    id: 3,
                    nome: "Boxe - Técnica e Cardio",
                    descricao: "Condicionamento e técnica de socos.",
                    exercicios: ["Pular corda", "Jab/Direto", "Abdominais"]
                }
            ]);
        }
    };

    const toggleFavorito = (id) => {
        const novosFavoritos = favoritos.includes(id)
            ? favoritos.filter(fav => fav !== id)
            : [...favoritos, id];

        setFavoritos(novosFavoritos);
        localStorage.setItem('favoritos', JSON.stringify(novosFavoritos));
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
                            {treino.imagem && <img src={treino.imagem} alt={treino.nome} className={style.imagem} />}
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
                                {treino.exercicios && (
                                    <ul>
                                        {treino.exercicios.map((ex, idx) => (
                                            <li key={idx}>{ex}</li>
                                        ))}
                                    </ul>
                                )}
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
