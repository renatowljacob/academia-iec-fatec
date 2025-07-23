import { Router } from "express";
import clientes from "../services/clientes.js";

const routerClientes = Router();

routerClientes.get("/", async (_, res) => {
    try {
        res.json(await clientes.getAll());
    } catch (err) {
        console.error("Erro ao requisitar clientes", err.message);
        res.status(500).json({ message: "Erro ao buscar clientes" });
    }
});

routerClientes.get("/:id", async (req, res) => {
    try {
        res.json(await clientes.getById(req.params.id));
    } catch (err) {
        console.error("Erro ao requisitar cliente", err.message);
        res.status(500).json({ message: "Erro ao buscar cliente" });
    }
});

routerClientes.post("/", async (req, res) => {
    try {
        const result = await clientes.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.error("Erro ao criar cliente", err.message);
        res.status(500).json({ message: "Erro ao criar cliente" });
    }
});

routerClientes.post("/login", async (req, res) => {
    const { email } = req.body;

    try {
        const clientesList = await clientes.getAll();

        const cliente = clientesList.find(
            (c) => c.email === email
        );

        if (!cliente) {
            return res.status(401).json({ message: "Email não encontrado" });
        }

        return res.status(200).json({ message: "Login bem-sucedido", cliente });
    } catch (err) {
        console.error("Erro ao fazer login", err.message);
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
});

routerClientes.put("/:id", async (req, res) => {
    try {
        res.json(await clientes.update(req.params.id, req.body));
    } catch (err) {
        console.error("Erro ao atualizar cliente", err.message);
        res.status(500).json({ message: "Erro ao atualizar cliente" });
    }
});

routerClientes.delete("/:id", async (req, res) => {
    try {
        res.json(await clientes.remove(req.params.id));
    } catch (err) {
        console.error("Erro ao deletar cliente", err.message);
        res.status(500).json({ message: "Erro ao deletar cliente" });
    }
});

export default routerClientes;
