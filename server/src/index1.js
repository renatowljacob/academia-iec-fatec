import "dotenv/config"
import express from "express";
import routerAdmin from "./routes/admins";
import routerAgendamentos from "./routes/agendamentos";
import routerAulas from "./routes/aulas";
import routerClientes from "./routes/clientes";
import routerPagamentos from "./routes/pagamentos";
import routerTreinos from "./routes/treinos";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_, res) => {
    res.json({ message: "ok" });
});

app.use("/clientes", clientesRouter);
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
