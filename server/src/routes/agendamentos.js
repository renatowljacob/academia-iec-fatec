import { Router } from "express";
import agendamentos from "../services/agendamentos";

const routerAgendamentos = Router();

routerAgendamentos.get("/", async (_, res) => {
    try {
        res.json(await agendamentos.getAll());
    } catch (err) {
        console.error("Erro ao requisitar agendamentos", err.message);
    }
});

routerAgendamentos.get("/:id", async (req, res) => {
    try {
        res.json(await agendamentos.getById(req.params.id));
    } catch (err) {
        console.error("Erro ao requisitar agendamento", err.message);
    }
});

routerAgendamentos.post("/", async (req, res) => {
    try {
        res.json(await agendamentos.create(req.body));
    } catch (err) {
        console.error("Erro ao criar agendamento", err.message);
    }
});

routerAgendamentos.put("/:id", async (req, res) => {
    try {
        res.json(await agendamentos.update(req.params.id, req.body));
    } catch (err) {
        console.error("Erro ao atualizar agendamento", err.message);
    }
});

routerAgendamentos.delete("/:id", async (req, res) => {
    try {
        res.json(await agendamentos.remove(req.params.id));
    } catch (err) {
        console.error("Erro ao deletar agendamento", err.message);
    }
});

export default routerAgendamentos;
