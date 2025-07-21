import style from "./consultaHorario.module.css"

const ConsultaHorario = () => {
        const treinos = [
            { tipo: 'Muay Thai', quantidade: 2 },
            { tipo: 'Jiu-Jitsu', quantidade: 1 },
            { tipo: 'Boxe', quantidade: 1 },
            { tipo: 'Karate', quantidade: 2 },
            { tipo: 'Kickboxing', quantidade: 1 }
        ];

        const horariosAtendimento = [
            { dia: "Segunda a Sexta", horario: "07:00 - 22:00" },
            { dia: "Sábado", horario: "08:00 - 14:00" },
            { dia: "Domingo", horario: "Fechado" },
        ];

        const aulasSemana = [
            { dia: "Segunda-feira", aula: "Jiu-Jitsu", horario: "19:00", professor: "Carlos Silva", vagas: 5 },
            { dia: "Terça-feira", aula: "Muay Thai", horario: "18:00", professor: "Ana Lima", vagas: 3 },
            { dia: "Quarta-feira", aula: "Boxe", horario: "20:00", professor: "Fernando Rocha", vagas: 0 },
            { dia: "Quinta-feira", aula: "Jiu-Jitsu", horario: "19:00", professor: "Carlos Silva", vagas: 2 },
            { dia: "Sexta-feira", aula: "MMA", horario: "17:00", professor: "Juliana Souza", vagas: 1 },
            { dia: "Sábado", aula: "Treinamento Funcional", horario: "09:00", professor: "Rafael Costa", vagas: 4 },
        ];

        const professores = [
            "Carlos Silva – Jiu-Jitsu",
            "Ana Lima – Muay Thai",
            "Fernando Rocha – Boxe",
            "Juliana Souza – MMA",
            "Rafael Costa – Funcional",
        ];

        return (
            <section className={style.view}>
                <div className={style.ui}>
                    {/* Grade de vagas no topo */}
                    <div>
                        <h3>Aulas da Semana - Vagas Disponíveis</h3>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left", padding: "10px", background: "#f0f0f0" }}>Dia</th>
                                    <th style={{ textAlign: "left", padding: "10px", background: "#f0f0f0" }}>Aula</th>
                                    <th style={{ textAlign: "left", padding: "10px", background: "#f0f0f0" }}>Horário</th>
                                    <th style={{ textAlign: "left", padding: "10px", background: "#f0f0f0" }}>Professor</th>
                                    <th style={{ textAlign: "left", padding: "10px", background: "#f0f0f0" }}>Vagas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aulasSemana.map((aula, index) => (
                                    <tr key={index} style={{ backgroundColor: aula.vagas === 0 ? '#f8d7da' : 'transparent' }}>
                                        <td style={{ padding: "10px" }}>{aula.dia}</td>
                                        <td style={{ padding: "10px" }}>{aula.aula}</td>
                                        <td style={{ padding: "10px" }}>{aula.horario}</td>
                                        <td style={{ padding: "10px" }}>{aula.professor}</td>
                                        <td style={{ padding: "10px" }}>
                                            {aula.vagas > 0 ? `${aula.vagas} vagas` : <strong>Lotado</strong>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                            <ul>
                                {professores.map((prof, index) => (
                                    <li key={index} style={{ marginBottom: '4px' }}>{prof}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    export default ConsultaHorario;
