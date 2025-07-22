import { Router } from "express";
import admins from "../services/admins.js";

const routerAdmin = Router();

routerAdmin.get("/", async (_, res) => {
    try {
        res.json(await admins.getAll());
    } catch (err) {
        console.error("Erro ao requisitar admins", err.message);
    }
});

routerAdmin.get("/:id", async (req, res) => {
    try {
        res.json(await admins.getById(req.params.id));
    } catch (err) {
        console.error("Erro ao requisitar admin", err.message);
    }
});

routerAdmin.post("/", async (req, res) => {
    try {
        res.json(await admins.create(req.body));
    } catch (err) {
        console.error("Erro ao criar admin", err.message);
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

export default routerAdmin;
