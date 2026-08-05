const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

process.env.NODE_ENV = 'production';

// 1. Verificar y compilar ANTES de inicializar Next.js
const nextBuildDir = path.join(__dirname, '.next');
if (!fs.existsSync(nextBuildDir)) {
  console.log('> No se encontró la carpeta .next compilada. Compilando Next.js ahora...');
  try {
    execSync('npx prisma generate && npx next build', { stdio: 'inherit', env: process.env });
    console.log('> Compilación completada con éxito.');
  } catch (err) {
    console.error('> Error compilando Next.js:', err);
  }
}

// 2. Inicializar Next.js en modo producción
const next = require('next');
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || process.env.SERVER_PORT || '3000', 10);

const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Next.js Miyobi Web Producción activo en http://${hostname}:${port}`);
  });
});
