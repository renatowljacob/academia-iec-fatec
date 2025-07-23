import { useState, useEffect } from 'react';
import style from "./consultaHorario.module.css";
import { getAllAulas } from '../../services/aulaService';
import { useNavigate } from 'react-router-dom';
import { isCliente } from '../../services/authService';

const ConsultaHorario = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isCliente()) {
            navigate("/");
        }
    }, []);

    const [aulas, setAulas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const horariosAtendimento = [
        { dia: "Segunda a Sexta", horario: "07:00 - 22:00" },
        { dia: "Sábado", horario: "08:00 - 14:00" },
        { dia: "Domingo", horario: "Fechado" },
    ];

    useEffect(() => {
        const fetchAulas = async () => {
            try {
                setLoading(true);
                const aulasData = await getAllAulas();
                setAulas(aulasData);
            } catch (err) {
                setError('Erro ao carregar aulas');
                console.error('Erro ao buscar aulas:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAulas();
    }, []);

    const getProfessoresUnicos = () => {
        const professoresSet = new Set();
        aulas.forEach(aula => {
            if (aula.professor) {
                professoresSet.add(`${aula.professor} – ${aula.nome}`);
            }
        });
        return Array.from(professoresSet);
    };

    if (loading) {
        return (
            <section className={style.view}>
                <div className={style.ui}>
                    <div>Carregando aulas...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className={style.view}>
                <div className={style.ui}>
                    <div>Erro: {error}</div>
                </div>
            </section>
        );
    }

    return (
        <section className={style.view}>
            <div className={style.ui}>
                {/* Grade de aulas */}
                <div>
                    <h3>Aulas Disponíveis</h3>
                    {aulas.length === 0 ? (
                        <p>Nenhuma aula cadastrada no momento.</p>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left", padding: "10px", background: "#f0f0f0" }}>Aula</th>
                                    <th style={{ textAlign: "left", padding: "10px", background: "#f0f0f0" }}>Horário</th>
                                    <th style={{ textAlign: "left", padding: "10px", background: "#f0f0f0" }}>Professor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aulas.map((aula) => (
                                    <tr key={aula.id}>
                                        <td style={{ padding: "10px" }}>{aula.nome}</td>
                                        <td style={{ padding: "10px" }}>{aula.horario}</td>
                                        <td style={{ padding: "10px" }}>{aula.professor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Horários de atendimento e Professores lado a lado */}
                <div style={{ display: "flex", gap: "40px" }}>
                    <div style={{ width: "50%" }}>
                        <h3>Horários de Atendimento</h3>
                        <ul>
                            {horariosAtendimento.map((item, index) => (
                                <li key={index} style={{ marginBottom: '24px' }}>
                                    <strong>{item.dia}:</strong> {item.horario}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ width: "50%" }}>
                        <h3>Professores</h3>
                        {getProfessoresUnicos().length === 0 ? (
                            <p>Nenhum professor cadastrado.</p>
                        ) : (
                            <ul>
                                {getProfessoresUnicos().map((prof, index) => (
                                    <li key={index} style={{ marginBottom: '4px' }}>{prof}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultaHorario;
