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

writeFileSync(path.join(outDir, 'jwtRS256.key'), privateKey, { flag: 'wx' });
writeFileSync(path.join(outDir, 'jwtRS256.key.pub'), publicKey, { flag: 'wx' });

// --- base64 (one-line) ของทั้ง PEM string ---
const privateKeyB64 = Buffer.from(privateKey, 'utf8').toString('base64');
const publicKeyB64  = Buffer.from(publicKey, 'utf8').toString('base64');

writeFileSync(path.join(outDir, 'jwtRS256.key.b64'), privateKeyB64 + '\n', { flag: 'wx' });
writeFileSync(path.join(outDir, 'jwtRS256.key.pub.b64'), publicKeyB64 + '\n', { flag: 'wx' });

console.log('Generated keys in .secrets/ + base64 files (*.b64)');
