import { Router } from "express";
import treinos from "../services/treinos.js";

const routerTreinos = Router();

// Buscar todos os treinos
routerTreinos.get("/", async (_, res) => {
    try {
        const result = await treinos.getAll();
        res.json(result);
    } catch (err) {
        console.error("Erro ao requisitar treinos", err.message);
        res.status(500).json({ erro: "Erro ao buscar treinos." });
    }
});

// Buscar um treino por ID
routerTreinos.get("/:id", async (req, res) => {
    try {
        const result = await treinos.getById(req.params.id);
        res.json(result);
    } catch (err) {
        console.error("Erro ao requisitar treino", err.message);
        res.status(500).json({ erro: "Erro ao buscar treino." });
    }
});

// Criar novo treino
routerTreinos.post("/", async (req, res) => {
    try {
        const result = await treinos.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.error("Erro ao criar treino", err.message);
        res.status(500).json({ erro: "Erro ao criar treino." });
    }
});

// Atualizar treino
routerTreinos.put("/:id", async (req, res) => {
    try {
        const result = await treinos.update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        console.error("Erro ao atualizar treino", err.message);
        res.status(500).json({ erro: "Erro ao atualizar treino." });
    }
});

// Deletar treino
routerTreinos.delete("/:id", async (req, res) => {
    try {
        const result = await treinos.remove(req.params.id);
        res.json(result);
    } catch (err) {
        console.error("Erro ao deletar treino", err.message);
        res.status(500).json({ erro: "Erro ao deletar treino." });
    }
});

export default routerTreinos;