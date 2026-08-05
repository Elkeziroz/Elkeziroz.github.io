const path = require('path');
const fs = require('fs');

// Cargar variables de entorno predeterminadas para Auth.js / NextAuth
process.env.AUTH_SECRET = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'miyobi-secret-key-2026-super-secure-key';
process.env.NEXTAUTH_SECRET = process.env.AUTH_SECRET;
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:' + (process.env.PORT || process.env.SERVER_PORT || '25584');

// 1. Auto-descompresión de paquete Standalone si existe next_standalone.zip
const zipPath = path.join(__dirname, 'next_standalone.zip');
const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(zipPath) && !fs.existsSync(standaloneServer)) {
  console.log('> Descomprimiendo servidor Standalone de producción (next_standalone.zip)...');
  try {
    const AdmZip = require('adm-zip');
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(path.join(__dirname, '.next', 'standalone'), true);
    console.log('✅ ¡Servidor Standalone descompresionado con éxito!');
  } catch (err) {
    console.error('> Error descomprimiendo standalone zip:', err.message || err);
  }
}

// 2. Si existe el servidor Standalone pre-compilado, ejecutarlo directamente (~40MB RAM)
if (fs.existsSync(standaloneServer)) {
  process.env.NODE_ENV = 'production';
  process.env.PORT = process.env.PORT || process.env.SERVER_PORT || '3000';
  process.env.HOSTNAME = '0.0.0.0';
  console.log(`> Iniciando Next.js Standalone Ultra-Ligero en puerto ${process.env.PORT}...`);
  require(standaloneServer);
} else {
  // Fallback si aún no ha terminado de extraer
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
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Next.js Miyobi Web Servidor activo en http://${hostname}:${port}`);
    });
  });
}
