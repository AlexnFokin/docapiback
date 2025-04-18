import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import config from './config';

const PORT = config.port;

const serverUrl = `http://localhost:${PORT}`;

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Backend API',
            version: '1.0.0',
            description: 'Api documentation',
        },
        servers: [
            {
                url: serverUrl,
                description: 'server',
            },
        ],
    },
    apis: [
        './src/routes/*.ts', 
        './src/controllers/*.ts',
        './src/swagger/auth.routes.ts'
    ],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
