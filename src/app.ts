import express from 'express';
import { NotFoundException } from './exceptions/http.exception';
import authRouter from './routes/auth.router';
import { errorMiddleware } from './middlewares/error.middleware';
import { taskRouter } from './routes/task.routes';
import { authMiddleware } from './middlewares/auth.middleware';
import { setupSwagger } from './config/swagger';
import config, { client_url } from './config/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: client_url
}))

app.use('/api', authRouter);

if ('production' != config.nodeEnv) {
    setupSwagger(app);
}

app.use('/api', authMiddleware);
app.use('/api', taskRouter);

app.use((req, res, next) => {
    console.log(req.url)
    next(new NotFoundException('Endpoint not found'));
});
app.use(errorMiddleware);

export default app;
