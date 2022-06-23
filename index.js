const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const quotes = require('./quotes.json');
const cors = require('cors')
let HIGH_SCORE = 0;

fs.readFile('./highScore.txt', function (err, data) {
    if (err) console.log(err);
    console.log(data);

    HIGH_SCORE = parseInt(data.toString());

})

async function updateHs(newHS = 0) {
    HIGH_SCORE = newHS;
    fs.writeFile('./highScore.txt', newHS.toString(), function (error) {
        if (error) console.log(error);
    });
}

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/quote', (req, res) => {
    console.log(Math.random() % quotes.grzes.length);

    if (Math.random() > 0.5)
        res.send(quotes.grzes[Math.floor(Math.random() * quotes.grzes.length)]);
    else
        res.send(quotes.ah[Math.floor(Math.random() * quotes.ah.length)])
});

app.get('/highScore', (req, res) => {
    res.send(HIGH_SCORE.toString());
});

app.put('/updateHS', (req, res) => {
    if (parseInt(req.body.score) > HIGH_SCORE) {
        updateHs(req.body.score).then(res.sendStatus(200));
    }
    else {
        res.statusMessage = "too low";
        res.append("reason", "Too low amount");
        res.sendStatus(400);
    }

    console.log(req.body);
});

app.post('/validateQuote', (req, res) => {

    console.log(req.body)

    if (!req.body?.selection || !req.body?.quote) {
        res.sendStatus(400);
        return;
    }
    const selection = req.body.selection;
    const quote = req.body.quote;

    if ((selection == "g" && quotes.grzes.includes(quote)) | (selection == "a" && quotes.ah.includes(quote))) {
        //res.append("verdict", "correct");
        res.status(200).json({ verdict: "correct" });
    } else {
        res.status(200).json({ verdict: "incorrect" });
    }
});

app.listen(PORT);

console.log(`Server started on port: ${PORT}`);