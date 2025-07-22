import { Router } from "express";
import clientes from "../services/clientes.js";

const routerClientes = Router();

routerClientes.get("/", async (_, res) => {
    try {
        res.json(await clientes.getAll());
    } catch (err) {
        console.error("Erro ao requisitar clientes", err.message);
    }
});

routerClientes.get("/:id", async (req, res) => {
    try {
        res.json(await clientes.getById(req.params.id));
    } catch (err) {
        console.error("Erro ao requisitar cliente", err.message);
    }
});

routerClientes.post("/", async (req, res) => {
    try {
        res.json(await clientes.create(req.body));
    } catch (err) {
        console.error("Erro ao criar cliente", err.message);
    }
});

routerClientes.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
        const clientesList = await clientes.getAll();

        const cliente = clientesList.find(
            (c) => c.email === email && c.senha
        );

        if (!cliente) {
            return res.status(401).json({ message: "Credenciais inválidas" });
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
    }
});

routerClientes.delete("/:id", async (req, res) => {
    try {
        res.json(await clientes.remove(req.params.id));
    } catch (err) {
        console.error("Erro ao deletar cliente", err.message);
    }
});

export default routerClientes;
