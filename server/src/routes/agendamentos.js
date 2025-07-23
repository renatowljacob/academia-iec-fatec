import { Router } from "express";
import agendamentos from "../services/agendamentos.js";

const routerAgendamentos = Router();

routerAgendamentos.get("/", async (_, res) => {
    try {
        res.json(await agendamentos.getAll());
    } catch (err) {
        console.error("Erro ao requisitar agendamentos", err.message);
        res.status(500).json({ message: "Erro ao buscar agendamentos" });
    }
});

routerAgendamentos.get("/:id", async (req, res) => {
    try {
        res.json(await agendamentos.getById(req.params.id));
    } catch (err) {
        console.error("Erro ao requisitar agendamento", err.message);
        res.status(500).json({ message: "Erro ao buscar agendamento" });
    }
});

routerAgendamentos.post("/", async (req, res) => {
    try {
        const result = await agendamentos.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.error("Erro ao criar agendamento", err.message);
        res.status(500).json({ message: "Erro ao criar agendamento" });
    }
});

routerAgendamentos.put("/:id", async (req, res) => {
    try {
        res.json(await agendamentos.update(req.params.id, req.body));
    } catch (err) {
        console.error("Erro ao atualizar agendamento", err.message);
        res.status(500).json({ message: "Erro ao atualizar agendamento" });
    }
});

routerAgendamentos.delete("/:id", async (req, res) => {
    try {
        res.json(await agendamentos.remove(req.params.id));
    } catch (err) {
        console.error("Erro ao deletar agendamento", err.message);
        res.status(500).json({ message: "Erro ao deletar agendamento" });
    }
});

// Buscar agendamentos por ID do cliente
routerAgendamentos.get("/cliente/:clienteId", async (req, res) => {
    try {
        const result = await agendamentos.getByClienteId(req.params.clienteId);
        res.json(result);
    } catch (err) {
        console.error("Erro ao buscar agendamentos do cliente", err.message);
        res.status(500).json({ message: "Erro ao buscar agendamentos do cliente" });
    }
});

// Marcar presença para um agendamento
routerAgendamentos.put("/:id/presenca", async (req, res) => {
    try {
        const { presente } = req.body;
        const result = await agendamentos.markPresenca(req.params.id, presente);
        res.json(result);
    } catch (err) {
        console.error("Erro ao marcar presença", err.message);
        res.status(500).json({ message: "Erro ao marcar presença" });
    }
});

// Buscar estatísticas de progresso para um cliente
routerAgendamentos.get("/cliente/:clienteId/progress", async (req, res) => {
    try {
        const clienteId = req.params.clienteId;
        const { startDate, endDate } = req.query;
        
        // Buscar agendamentos com informações de presença
        const agendamentosData = await agendamentos.getByClienteId(clienteId);
        
        // Filtrar por intervalo de datas se fornecido
        let filteredData = agendamentosData;
        if (startDate && endDate) {
            filteredData = agendamentosData.filter(ag => {
                const agDate = new Date(ag.data);
                return agDate >= new Date(startDate) && agDate <= new Date(endDate);
            });
        }
        
        // Calcular estatísticas
        const totalAgendamentos = filteredData.length;
        const presencas = filteredData.filter(ag => ag.presente).length;
        const percentualPresenca = totalAgendamentos > 0 ? (presencas / totalAgendamentos * 100).toFixed(1) : 0;
        
        // Agrupar por dia da semana
        const weeklyData = {};
        filteredData.forEach(ag => {
            const date = new Date(ag.data);
            const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, etc.
            const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
            const dayName = dayNames[dayOfWeek];
            
            if (!weeklyData[dayName]) {
                weeklyData[dayName] = { count: 0, present: 0 };
            }
            weeklyData[dayName].count++;
            if (ag.presente) weeklyData[dayName].present++;
        });
        
        res.json({
            totalAgendamentos,
            presencas,
            percentualPresenca,
            weeklyData,
            agendamentos: filteredData
        });
    } catch (err) {
        console.error("Erro ao buscar estatísticas de progresso", err.message);
        res.status(500).json({ message: "Erro ao buscar estatísticas de progresso" });
    }
});

export default routerAgendamentos;
