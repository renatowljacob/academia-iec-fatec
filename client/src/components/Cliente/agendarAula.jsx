import React, { useState, useEffect } from 'react';
import style from './agendarAula.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createAgendamento, getAgendamentosByCliente } from '../../services/agendamentoService';
import { getAllAulas } from '../../services/aulaService';
import { getUserData, isCliente } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const AgendarAula = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isCliente()) {
            navigate("/");
        }
    }, []);

    const [selectedDate, setSelectedDate] = useState(null);
    const [newDate, setNewDate] = useState("");
    const [selectedAula, setSelectedAula] = useState("");
    const [agendamentos, setAgendamentos] = useState([]);
    const [aulas, setAulas] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const userData = getUserData();
    const clienteId = userData?.user?.id;

    useEffect(() => {
        loadAgendamentos();
        loadAulas();
    }, []);

    const loadAgendamentos = async () => {
        if (!clienteId) return;

        try {
            const data = await getAgendamentosByCliente(clienteId);
            setAgendamentos(data);
        } catch (err) {
            console.error("Erro ao carregar agendamentos:", err);
            setError("Erro ao carregar agendamentos");
        }
    };

    const loadAulas = async () => {
        try {
            const data = await getAllAulas();
            setAulas(data);
        } catch (err) {
            console.error("Erro ao carregar aulas:", err);
            setError("Erro ao carregar aulas");
        }
    };

    // Converter agendamentos para datas para marcação no calendário
    const markedDays = agendamentos.map(agendamento => new Date(agendamento.data));

    const isMarked = (date) => {
        return markedDays.some((markedDate) =>
            markedDate.toDateString() === date.toDateString()
        );
    };

    const handleAddDate = async () => {
        if (!newDate || !selectedAula) {
            setError("Por favor, selecione uma data e uma aula.");
            return;
        }

        if (!clienteId) {
            setError("Usuário não autenticado.");
            return;
        }

        try {
            await createAgendamento({
                cliente_id: clienteId,
                aula_id: selectedAula,
                data: newDate
            });

            setSuccess(`Aula agendada para ${new Date(newDate).toLocaleDateString('pt-BR')}!`);
            setError("");
            setNewDate("");
            setSelectedAula("");

            // Recarregar agendamentos
            loadAgendamentos();
        } catch (err) {
            console.error("Erro ao agendar aula:", err);
            setError("Erro ao agendar aula. Tente novamente.");
            setSuccess("");
        }
    };

    return (
        <section className={style.view}>
            <div className={style.ui}>
                <div className={style.left}>
                    <h3>Calendário de Aulas</h3>
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        tileClassName={({ date }) =>
                            isMarked(date) ? style.marked : null
                        }
                    />

                    <div className={style.form}>
                        <label>Selecionar aula:</label>
                        <select
                            value={selectedAula}
                            onChange={(e) => setSelectedAula(e.target.value)}
                            required
                        >
                            <option value="">Selecione uma aula</option>
                            {aulas.map((aula) => (
                                <option key={aula.id} value={aula.id}>
                                    {aula.nome} - {aula.horario}
                                </option>
                            ))}
                        </select>

                        <label>Agendar nova aula:</label>
                        <input
                            type="date"
                            value={newDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                        <button onClick={handleAddDate}>Agendar</button>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {success && <p style={{ color: "green" }}>{success}</p>}
                    </div>
                </div>

                <div className={style.right}>
                    <h3>Datas Agendadas</h3>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>Dia da Semana</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.map((agendamento, index) => {
                                const date = new Date(agendamento.data);
                                return (
                                    <tr key={index}>
                                        <td>
                                            {date.toLocaleDateString('pt-BR', {
                                                weekday: 'long',
                                            })}
                                        </td>
                                        <td>
                                            {date.toLocaleDateString('pt-BR', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AgendarAula;
