import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/users/usersRoutes.js';
import authRoutes from './routes/auth/authRoutes.js';
import openaiRoutes from './routes/openai/openaiRoutes.js';

import fastifyCors from '@fastify/cors'; // Réglage des CORS

const app = fastify();

const prisma = new PrismaClient();
app.decorate('prisma', prisma);

userRoutes(app);
authRoutes(app);
openaiRoutes(app);

// GET pour tester le serveur
app.get('/', async (request, reply) => {
    try {
        console.log('GET /');
        reply.send({ hello: 'world' });
    } catch(err) {
        console.error(err);
    }
});

// Réglage des CORS
app.register(fastifyCors, {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*'
});

const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log('Server is running on http://localhost:3000');
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};

start();