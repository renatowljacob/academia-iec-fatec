require("dotenv").config()

const express = require("express");
const app = express();
const port = 3000;

app.use(app.json());

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});

module.exports = app;
