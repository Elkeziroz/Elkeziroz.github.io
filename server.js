const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');

// Verificar si existe la carpeta de compilación estática de producción
const hasBuild = fs.existsSync(path.join(__dirname, '.next', 'BUILD_ID'));

if (!hasBuild) {
  // Eliminar NODE_ENV=production para permitir que Next.js levante el servidor dinámico sin exigir BUILD_ID
  delete process.env.NODE_ENV;
} else {
  process.env.NODE_ENV = 'production';
}

const dev = !hasBuild;
const next = require('next');
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
    console.log(`> Next.js Miyobi Web Servidor activo en http://${hostname}:${port} (Modo: ${dev ? 'Dinámico (Sin Build)' : 'Producción (Compilado)'})`);
  });
});
