const path = require('path');
const fs = require('fs');

// Cargar variables de .env y .env.local
function loadEnv(envPath) {
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split(/\r?\n/).forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*["']?(.*?)["']?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2];
        if (val.endsWith('"') || val.endsWith("'")) val = val.slice(0, -1);
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    });
  }
}

loadEnv(path.join(__dirname, '.env.local'));
loadEnv(path.join(__dirname, '.env'));

// Variables por defecto de NextAuth / Discord
process.env.AUTH_DISCORD_ID = process.env.AUTH_DISCORD_ID || '1532557308935012443';
process.env.AUTH_DISCORD_SECRET = process.env.AUTH_DISCORD_SECRET || 'q8RMiqqNiVBhPNtJ156-GO49okgdhI6A';
process.env.AUTH_SECRET = process.env.AUTH_SECRET || '51ffa308e6b7950bca1dcac69671e1a0e78d3ecb0396317e3cbbf0be0b3c838c';
process.env.NEXTAUTH_SECRET = process.env.AUTH_SECRET;
process.env.AUTH_TRUST_HOST = 'true';

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
