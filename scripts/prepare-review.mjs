import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const output = resolve(import.meta.dirname, '../review-dist');
await mkdir(output, { recursive: true });
await writeFile(resolve(output, '_redirects'), '/* /index.html 200\n');
await writeFile(resolve(output, '_headers'), `/*
  X-Robots-Tag: noindex, nofollow
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' blob:; frame-src https://www.google.com https://maps.google.com; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'
/index.html
  Cache-Control: no-cache
`);
const html = await readFile(resolve(output, 'index.html'), 'utf8');
if (/connect\.facebook\.net|facebook\.com\/tr\?/.test(html)) throw Error('Review build contains Meta Pixel');
console.log('Review artifact ready: review-dist; SPA fallback, noindex and network restrictions included.');
