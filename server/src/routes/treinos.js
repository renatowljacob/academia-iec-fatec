import { Router } from "express";
import treinos from "../services/treinos.js";

const routerTreinos = Router();

routerTreinos.get("/", async (_, res) => {
    try {
        res.json(await treinos.getAll());
    } catch (err) {
        console.error("Erro ao requisitar treinos", err.message);
    }
});

routerTreinos.get("/:id", async (req, res) => {
    try {
        res.json(await treinos.getById(req.params.id));
    } catch (err) {
        console.error("Erro ao requisitar treino", err.message);
    }
});

routerTreinos.post("/", async (req, res) => {
    try {
        res.json(await treinos.create(req.body));
    } catch (err) {
        console.error("Erro ao criar treino", err.message);
    }
});

routerTreinos.put("/:id", async (req, res) => {
    try {
        res.json(await treinos.update(req.params.id, req.body));
    } catch (err) {
        console.error("Erro ao atualizar treino", err.message);
    }
});

routerTreinos.delete("/:id", async (req, res) => {
    try {
        res.json(await treinos.remove(req.params.id));
    } catch (err) {
        console.error("Erro ao deletar treino", err.message);
    }
});

export default routerTreinos;

