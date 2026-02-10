import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes/index.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

app.get('/', (req, res) => {
    res.status(200).json({message: 'Сервер работает!'});
});

app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
