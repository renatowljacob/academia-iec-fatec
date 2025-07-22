import { Router } from "express";
import aulas from "../services/aulas.js";

const routerAulas = Router();

routerAulas.get("/", async (_, res) => {
    try {
        res.json(await aulas.getAll());
    } catch (err) {
        console.error("Erro ao requisitar aulas", err.message);
    }
});

routerAulas.get("/:id", async (req, res) => {
    try {
        res.json(await aulas.getById(req.params.id));
    } catch (err) {
        console.error("Erro ao requisitar aula", err.message);
    }
});

routerAulas.post("/", async (req, res) => {
    try {
        res.json(await aulas.create(req.body));
    } catch (err) {
        console.error("Erro ao criar aula", err.message);
    }
});

routerAulas.put("/:id", async (req, res) => {
    try {
        res.json(await aulas.update(req.params.id, req.body));
    } catch (err) {
        console.error("Erro ao atualizar aula", err.message);
    }
});

routerAulas.delete("/:id", async (req, res) => {
    try {
        res.json(await aulas.remove(req.params.id));
    } catch (err) {
        console.error("Erro ao deletar aula", err.message);
    }
});

export default routerAulas;
