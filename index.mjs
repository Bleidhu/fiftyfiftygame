import {express}  from 'express';
import * as fs from 'node:fs/promises';

let HIGH_SCORE = 0;
let HS_FILE;

try
{
    HS_FILE =  await fs.open('./highScore.txt', 'w');
    let readData = await HS_FILE.readFile();
    HIGH_SCORE = parseInt(readData);
} finally
{
    await filehandle?.close();
}

const PORT = process.env.PORT ?? 3000;

const app = express();


app.get('/quote', (req, res) => {
    res.send('quote');
});

app.get('/highScore', (req, res) => {
    res.send(HIGH_SCORE.toString());
});

app.put('/quote', (req, res) => {
    res.send('quote');
});

app.post('/quote', (req, res) => {
    res.send('quote');
});

app.listen(PORT);

console.log(`Server started on port: ${PORT}`);