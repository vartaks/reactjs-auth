const express = require('express');
require('dotenv').config();

const app = express();

app.get('/public', function(req, res) {
    res.json({
        message: "Hello Sourabh from a public API!"
    });
});

app.listen(3001);
console.log("API server listening on ", process.env.REACT_APP_API_URL);
