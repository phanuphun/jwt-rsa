import { generateKeyPairSync } from 'crypto';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), '.secrets');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

writeFileSync(path.join(outDir, 'jwtRS256.key'), privateKey, { flag: 'wx' });     // wx = ถ้ามีอยู่แล้วจะ error (กันทับ)
writeFileSync(path.join(outDir, 'jwtRS256.key.pub'), publicKey, { flag: 'wx' });

console.log('Generated keys in .secrets/');
