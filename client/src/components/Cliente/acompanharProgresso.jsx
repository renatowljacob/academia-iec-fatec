import style from "./acompanharProgresso.module.css"

import * as React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer } from 'recharts';

// Dados com dias da semana e tempo em minutos
const data = [
    { day: 'Segunda', time: 20 },
    { day: 'Terça', time: 50.55 },
    { day: 'Quarta', time: 32.04 },
    { day: 'Quinta', time: 120.10 },
    { day: 'Sexta', time: 47 },
    { day: 'Sábado', time: 52 },
];

// Dados para a tabela de tipos de treinos (Academia de Artes Marciais)
const treinos = [
    { tipo: 'Muay Thai', quantidade: 2 },
    { tipo: 'Jiu-Jitsu', quantidade: 1 },
    { tipo: 'Boxe', quantidade: 1 },
    { tipo: 'Karate', quantidade: 2 },
    { tipo: 'Kickboxing', quantidade: 1 },
];

const AcompanharProgresso = () => {
    return (
        <section className={style.view}>
            <div className={style.ui}>
                <h3>Acompanhar meu progresso</h3>

                {/* Gráfico de Frequência de Treinos */}
                <div className={style.up}>
                    <h4>Frequência dos treinos</h4>
                    <ResponsiveContainer width="100%" height={125}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis label={{ value: 'Tempo (minutos)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip formatter={(value) => `${value} min`} />
                            <Line type="monotone" dataKey="time" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Tabela de Tipos de Treinos mais realizados na semana */}
                <div className={style.down}>
                    <h4>Modalidades mais realizadas nessa semana</h4>
                    <table className={style.tabela}>
                        <thead>
                            <tr>
                                <th>Tipo de Treino</th>
                                <th>Quantidade de Vezes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {treinos.map((treino, index) => (
                                <tr key={index}>
                                    <td>{treino.tipo}</td>
                                    <td>{treino.quantidade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default AcompanharProgresso;
