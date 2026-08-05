const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const fs = require('fs');

// Auto-descompresión automática de producción si existe next_build.zip
const zipPath = path.join(__dirname, 'next_build.zip');
const buildIdPath = path.join(__dirname, '.next', 'BUILD_ID');

if (fs.existsSync(zipPath) && !fs.existsSync(buildIdPath)) {
  console.log('> Descomprimiendo compilación de producción (next_build.zip)...');
  try {
    const AdmZip = require('adm-zip');
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(__dirname, true);
    console.log('✅ ¡Compilación descompresionada con éxito!');
  } catch (err) {
    console.error('> Error descomprimiendo next_build.zip:', err.message || err);
  }
}

process.env.NODE_ENV = 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || process.env.SERVER_PORT || '3000', 10);

const next = require('next');
const app = next({ dev: false, hostname, port });
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
    console.log(`> Next.js Miyobi Web Producción ultra-optimizado activo en http://${hostname}:${port}`);
  });
});
