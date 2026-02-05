'use strict';
import Express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const app = Express();
const PUBLIC_KEY = Buffer.from(process.env.KEY, 'base64').toString('utf8');   
const port = 4002

app.get('/', (req, res) => {
  res.send('Hello from Server Two!');
});

app.post('/verify', async (req, res) => {
    try {
        console.log('Public Key:', PUBLIC_KEY);
        const token = req.headers['authorization'].split(' ')[1];
        const verifyOptions = {
            algorithms: ['RS256'],
        };
        const decoded = jwt.verify(token, PUBLIC_KEY, verifyOptions);
        res.json({ decoded });
    } catch (err) {
        console.error('Error generating token:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
  console.log(`Server Two is running at http://localhost:${port}`);
});