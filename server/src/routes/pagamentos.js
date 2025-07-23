import { Router } from "express";
import pagamentos from "../services/pagamentos.js";

const routerPagamentos = Router();

routerPagamentos.get("/", async (_, res) => {
    try {
        res.json(await pagamentos.getAll());
    } catch (err) {
        console.error("Erro ao requisitar pagamentos", err.message);
        res.status(500).json({ message: "Erro ao buscar pagamentos" });
    }
});

routerPagamentos.get("/:id", async (req, res) => {
    try {
        res.json(await pagamentos.getById(req.params.id));
    } catch (err) {
        console.error("Erro ao requisitar pagamento", err.message);
    }
});

routerPagamentos.post("/", async (req, res) => {
    try {
        const result = await pagamentos.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.error("Erro ao criar pagamento", err.message);
        res.status(500).json({ message: "Erro ao criar pagamento" });
    }
});

routerPagamentos.put("/:id", async (req, res) => {
    try {
        res.json(await pagamentos.update(req.params.id, req.body));
    } catch (err) {
        console.error("Erro ao atualizar pagamento", err.message);
    }
});

routerPagamentos.delete("/:id", async (req, res) => {
    try {
        res.json(await pagamentos.remove(req.params.id));
    } catch (err) {
        console.error("Erro ao deletar pagamento", err.message);
        res.status(500).json({ message: "Erro ao deletar pagamento" });
    }
});

// Buscar pagamentos por ID do cliente
routerPagamentos.get("/cliente/:clienteId", async (req, res) => {
    try {
        const result = await pagamentos.getByClienteId(req.params.clienteId);
        res.json(result);
    } catch (err) {
        console.error("Erro ao buscar pagamentos do cliente", err.message);
        res.status(500).json({ message: "Erro ao buscar pagamentos do cliente" });
    }
});

export default routerPagamentos;
