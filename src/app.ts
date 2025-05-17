import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { userRoutes } from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;