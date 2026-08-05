const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');
const next = require('next');

// Detección automática: si existe compilación previa usa Producción, sino usa Modo Dinámico sin fallar
const isProduction = fs.existsSync(path.join(__dirname, '.next', 'BUILD_ID'));
const dev = !isProduction;

if (isProduction) {
  process.env.NODE_ENV = 'production';
}

const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || process.env.SERVER_PORT || '3000', 10);

const app = next({ dev, hostname, port });
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
    console.log(`> Next.js Miyobi Web Servidor activo en http://${hostname}:${port} (Modo: ${isProduction ? 'Producción' : 'Dinámico'})`);
  });
});
