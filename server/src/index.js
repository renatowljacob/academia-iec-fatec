import "dotenv/config"

import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});

export default app;
