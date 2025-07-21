import { Router } from "express";
import pagamentos from "../services/pagamentos";

const routerPagamentos = Router();

routerPagamentos.get("/", async (_, res) => {
    try {
        res.json(await pagamentos.getAll());
    } catch (err) {
        console.error("Erro ao requisitar pagamentos", err.message);
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
        res.json(await pagamentos.create(req.body));
    } catch (err) {
        console.error("Erro ao criar pagamento", err.message);
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
    }
});

export default routerPagamentos;
