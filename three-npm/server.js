import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3005;

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
	console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
});
