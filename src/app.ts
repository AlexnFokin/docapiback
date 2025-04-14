import express from 'express';
import { NotFoundException } from './exceptions/http.exception';
import authRouter from './routes/auth.router';
import { errorMiddleware } from './middlewares/error.middleware';
import { taskRouter } from './routes/task.routes';


const app = express();

app.use(express.json());

app.use('/api', authRouter);

// app.use('api/', authMiddleware);

app.use('/api', taskRouter);

app.use((req, res, next) => {
    next(new NotFoundException('Endpoint not found'));
  });
app.use(errorMiddleware);

export default app;