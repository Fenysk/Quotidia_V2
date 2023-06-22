import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { userRoutes } from './components/users/index.js';
import { authRoutes } from './components/auth/index.js';
import { openaiRoutes } from './components/openai/index.js';
import { quickEntryRoutes } from './components/quickEntry/index.js';
import { notesRoutes } from './components/notes/index.js';
import { tasksRoutes } from './components/tasks/index.js';
import cors from './middleware/cors.js';

const app = fastify();

const prisma = new PrismaClient();
app.decorate('prisma', prisma);

userRoutes(app);
authRoutes(app);
openaiRoutes(app);
quickEntryRoutes(app);
notesRoutes(app);
tasksRoutes(app);

cors(app);

// GET pour tester le serveur
app.get('/', async (request, reply) => {
    try {
        console.log('GET /');
        reply.send({ hello: 'world' });
    } catch(err) {
        console.error(err);
    }
});



const start = async () => {
    try {
        await app.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server is running on http://localhost:3000');
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};

start();