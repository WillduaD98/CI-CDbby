import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../client/dist')));

// Rutas de API
app.use(routes);

// Catch-all: enviar index.html para rutas frontend
app.get('*', (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Conexión a base de datos y arranque del servidor
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
