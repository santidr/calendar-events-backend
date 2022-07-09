const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "Hello client!",
    });
});

app.listen(8080, () => {
    console.log("Server running on port: 8080");
});