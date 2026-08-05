const path = require('path');
const fs = require('fs');

// Servidor ultraligero de producción Standalone (~60MB de RAM)
const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneServer)) {
  process.env.NODE_ENV = 'production';
  process.env.PORT = process.env.PORT || process.env.SERVER_PORT || '3000';
  process.env.HOSTNAME = '0.0.0.0';
  console.log(`> Iniciando Next.js Standalone Ultra-Ligero en puerto ${process.env.PORT}...`);
  require(standaloneServer);
} else {
  // Fallback dinámico si no hay build previa
  const { createServer } = require('http');
  const { parse } = require('url');
  delete process.env.NODE_ENV;
  const next = require('next');
  const hostname = '0.0.0.0';
  const port = parseInt(process.env.PORT || process.env.SERVER_PORT || '3000', 10);
  const app = next({ dev: true, hostname, port });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error handling', req.url, err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Next.js Miyobi Web Servidor activo en http://${hostname}:${port}`);
    });
  });
}
