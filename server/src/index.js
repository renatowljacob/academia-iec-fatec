import "dotenv/config"
import express from "express";
import routerAdmin from "../src/routes/admins.js";
import routerAgendamentos from "./routes/agendamentos.js";
import routerAulas from "./routes/aulas.js";
import routerClientes from "./routes/clientes.js";
import routerPagamentos from "./routes/pagamentos.js";
import routerTreinos from "./routes/treinos.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_, res) => {
    res.json({ message: "ok" });
});

app.use("/clientes", routerClientes);
app.use("/admins", routerAdmin);
app.use("/agendamentos", routerAgendamentos);
app.use("/aulas", routerAulas);
app.use("/pagamentos", routerPagamentos);
app.use("/treinos", routerTreinos);

app.use((err, _, res, next) => {
    const statusCode = err.statuScode || 500;
    console.error(err.statusMessage, err.stack);
    res.status(statusCode).json({ message: err.statusMessage })
    return;
})

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});

export default app;
