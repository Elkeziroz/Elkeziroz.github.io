const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const nextBuildDir = path.join(__dirname, '.next');
if (!fs.existsSync(nextBuildDir)) {
  console.log('> Compilando versión de producción con Next.js...');
  try {
    execSync('node ./node_modules/next/dist/bin/next build', { stdio: 'inherit' });
    console.log('> Compilación de producción completada con éxito.');
  } catch (err) {
    console.error('> Error durante la compilación de Next.js:', err.message || err);
    process.exit(1);
  }
}

process.env.NODE_ENV = 'production';
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
