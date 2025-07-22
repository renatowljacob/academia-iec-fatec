import { Router } from "express";
import admins from "../services/admins.js";

const routerAdmin = Router();

routerAdmin.get("/", async (_, res) => {
    try {
        res.json(await admins.getAll());
    } catch (err) {
        console.error("Erro ao requisitar admins", err.message);
        res.status(500).json({ message: "Erro ao buscar admins" });
    }
});

routerAdmin.get("/:id", async (req, res) => {
    try {
        res.json(await admins.getById(req.params.id));
    } catch (err) {
        console.error("Erro ao requisitar admin", err.message);
        res.status(500).json({ message: "Erro ao buscar admin" });
    }
});

routerAdmin.post("/", async (req, res) => {
    try {
        res.json(await admins.create(req.body));
    } catch (err) {
        console.error("Erro ao criar admin", err.message);
        res.status(500).json({ message: "Erro ao criar admin" });
    }
});

routerAdmin.put("/:id", async (req, res) => {
    try {
        res.json(await admins.update(req.params.id, req.body));
    } catch (err) {
        console.error("Erro ao atualizar admin", err.message);
    }
});

routerAdmin.delete("/:id", async (req, res) => {
    try {
        res.json(await admins.remove(req.params.id));
    } catch (err) {
        console.error("Erro ao deletar admin", err.message);
    }
});

routerAdmin.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        const adminsList = await admins.getAll();

        const admin = adminsList.find(
            (a) => a.email === email && a.senha === senha
        );

        if (!admin) {
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        return res.status(200).json({ message: "Login bem-sucedido", admin });
    } catch (err) {
        console.error("Erro ao fazer login", err.message);
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
});

export default routerAdmin;
