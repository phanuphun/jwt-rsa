'use strict';
import Express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const app = Express();
const PRIVATE_KEY = Buffer.from(process.env.KEY, 'base64').toString('utf8');   
const port = 4001

async function genToken() {
    const payload = {
        sub: '1234567890',
        name: 'John Does',
        admin: true
    };
    const signOptions = {
        algorithm: 'RS256',
        expiresIn: '1h',
    };
    console.log('Private Key:', PRIVATE_KEY);
    console.log('Payload:', payload);
    console.log('Sign Options:', signOptions);
    return jwt.sign(payload, PRIVATE_KEY, signOptions);
}

app.get('/', (req, res) => {
  res.send('Hello from Server One!');
});

app.post('/login', async (req, res) => {
    try {
        const token = await genToken();
        res.json({ token });
    } catch (err) {
        console.error('Error generating token:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
  console.log(`Server One is running at http://localhost:${port}`);
});