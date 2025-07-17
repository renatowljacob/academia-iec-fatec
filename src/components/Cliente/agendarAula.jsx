import React, { useState } from 'react';
import style from './agendarAula.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AgendarAula = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [newDate, setNewDate] = useState("");

    // Dias marcados (exemplo fixo)
    const markedDays = [
        new Date(2025, 6, 7),
        new Date(2025, 6, 8),
        new Date(2025, 6, 9),
        new Date(2025, 6, 10),
        new Date(2025, 6, 11),
        new Date(2025, 6, 12),
        new Date(2025, 6, 13),
        new Date(2025, 6, 19),
        new Date(2025, 6, 30),
        new Date(2025, 6, 31),
    ];

    const isMarked = (date) => {
        return markedDays.some((markedDate) =>
            markedDate.toDateString() === date.toDateString()
        );
    };

    const handleAddDate = () => {
        if (newDate) {
            const parsedDate = new Date(newDate);
            alert(`Data ${parsedDate.toLocaleDateString('pt-BR')} agendada!`);
            // Aqui você pode adicionar lógica para atualizar o estado `markedDays` futuramente.
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
                        <label>Agendar nova aula:</label>
                        <input
                            type="date"
                            value={newDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                        <button onClick={handleAddDate}>Agendar</button>
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
                            {markedDays.map((date, index) => (
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AgendarAula;
