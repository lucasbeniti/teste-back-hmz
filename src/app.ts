import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { loginRoutes } from './routes/loginRoutes';
import { userRoutes } from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;