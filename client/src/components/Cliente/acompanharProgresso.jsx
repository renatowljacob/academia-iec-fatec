import style from "./acompanharProgresso.module.css"
import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer } from 'recharts';
import { getAgendamentosByCliente, getProgressStats } from '../../services/agendamentoService';
import { getTreinosByCliente } from '../../services/treinoService';
import { getUserData, isCliente } from '../../services/authService';
import { useNavigate } from "react-router-dom";

const AcompanharProgresso = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isCliente()) {
            navigate("/");
        }
    }, []);

    const [chartData, setChartData] = useState([]);
    const [treinosData, setTreinosData] = useState([]);
    const [progressStats, setProgressStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const userData = getUserData();
    const clienteId = userData?.user?.id;

    useEffect(() => {
        if (clienteId) {
            loadProgressData();
        }
    }, [clienteId]);

    const loadProgressData = async () => {
        try {
            setLoading(true);

            // Obter datas da semana atual
            const now = new Date();
            const weekStart = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Segunda-feira
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6); // Domingo

            // Carregar estatísticas de progresso e dados de treino
            const [progressData, treinosDataFromApi] = await Promise.all([
                getProgressStats(clienteId, weekStart.toISOString().split('T')[0], weekEnd.toISOString().split('T')[0]),
                getTreinosByCliente(clienteId)
            ]);

            setProgressStats(progressData);

            // Processar dados para gráficos
            processChartData(progressData.weeklyData);
            processTreinosData(treinosDataFromApi);

        } catch (err) {
            console.error("Erro ao carregar dados de progresso:", err);
            setError("Erro ao carregar dados de progresso");

            // Usar dados estáticos como fallback se a API falhar
            setChartData([
                { day: 'Segunda', time: 0, count: 0 },
                { day: 'Terça', time: 0, count: 0 },
                { day: 'Quarta', time: 0, count: 0 },
                { day: 'Quinta', time: 0, count: 0 },
                { day: 'Sexta', time: 0, count: 0 },
                { day: 'Sábado', time: 0, count: 0 },
                { day: 'Domingo', time: 0, count: 0 },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const processChartData = (weeklyData) => {
        const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

        const chartData = daysOfWeek.map(day => {
            const dayData = weeklyData[day] || { count: 0, present: 0 };
            // Assumindo que cada aula tem 60 minutos, contar apenas aulas em que esteve presente
            const time = dayData.present * 60;

            return {
                day: day,
                time: time,
                count: dayData.count,
                present: dayData.present
            };
        });

        setChartData(chartData);
    };

    const processTreinosData = (treinosDataFromApi) => {
        // Contar tipos de treino
        const treinoCount = {};

        treinosDataFromApi.forEach(treino => {
            const tipo = treino.nome || treino.tipo || 'Treino Geral';
            treinoCount[tipo] = (treinoCount[tipo] || 0) + 1;
        });

        // Converter para formato de array
        const treinosArray = Object.entries(treinoCount).map(([tipo, quantidade]) => ({
            tipo,
            quantidade
        }));

        setTreinosData(treinosArray);
    };
    return (
        <section className={style.view}>
            <div className={style.ui}>
                <h3>Acompanhar meu progresso</h3>

                {error && <p style={{ color: "red" }}>{error}</p>}

                {loading ? (
                    <p>Carregando dados de progresso...</p>
                ) : (
                    <>
                        {/* Gráfico de Frequência de Treinos */}
                        <div className={style.up}>
                            <h4>Frequência dos treinos (esta semana)</h4>
                            <ResponsiveContainer width="100%" height={125}>
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis label={{ value: 'Tempo (minutos)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip formatter={(value) => `${value} min`} />
                                    <Line type="monotone" dataKey="time" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Tabela de Tipos de Treinos mais realizados */}
                        <div className={style.down}>
                            <h4>Seus treinos personalizados</h4>
                            <table className={style.tabela}>
                                <thead>
                                    <tr>
                                        <th>Tipo de Treino</th>
                                        <th>Quantidade Disponível</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {treinosData.length > 0 ? (
                                        treinosData.map((treino, index) => (
                                            <tr key={index}>
                                                <td>{treino.tipo}</td>
                                                <td>{treino.quantidade}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={2}>Nenhum treino personalizado encontrado</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Additional stats section */}
                        <div className={style.stats}>
                            <h4>Estatísticas da semana</h4>
                            <div className={style.statsGrid}>
                                <div className={style.statCard}>
                                    <h5>Aulas Agendadas</h5>
                                    <p>{progressStats?.totalAgendamentos || 0}</p>
                                </div>
                                <div className={style.statCard}>
                                    <h5>Aulas Presentes</h5>
                                    <p>{progressStats?.presencas || 0}</p>
                                </div>
                                <div className={style.statCard}>
                                    <h5>% Presença</h5>
                                    <p>{progressStats?.percentualPresenca || 0}%</p>
                                </div>
                                <div className={style.statCard}>
                                    <h5>Treinos Personalizados</h5>
                                    <p>{treinosData.length}</p>
                                </div>
                                <div className={style.statCard}>
                                    <h5>Tempo Total (min)</h5>
                                    <p>{chartData.reduce((total, day) => total + day.time, 0)}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default AcompanharProgresso;
