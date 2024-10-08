import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import rootRoute from './routes/root.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3500;

// Static Files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', rootRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
