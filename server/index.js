/* eslint-disable */
const express = require("express");
const app     = express();
const port    = process.env.PORT || 8080;

const print   = require("./lib/print");

app.use(express.json());

app.post("/data", (req, res) => {
    console.log(req.body);

    res.send();
});

app.listen(port, () => console.log("Listening on port *:8080"));
