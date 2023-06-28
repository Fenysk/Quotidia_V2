import fastify from 'fastify'; // On importe le framework Fastify
import { PrismaClient } from '@prisma/client'; // On importe le client Prisma

// On importe les différentes routes du dossier components
import { userRoutes } from './components/users/index.js';
import { authRoutes } from './components/auth/index.js';
import { openaiRoutes } from './components/openai/index.js';
import { quickEntryRoutes } from './components/quickEntry/index.js';
import { notesRoutes } from './components/notes/index.js';
import { tasksRoutes } from './components/tasks/index.js';

// On importe le middleware CORS
import cors from './middleware/cors.js';

const app = fastify(); // On instancie l'application Fastify
const prisma = new PrismaClient(); // On instancie le client Prisma

app.decorate('prisma', prisma); // On injecte le client Prisma dans l'application Fastify

// On enregistre les routes
userRoutes(app);
authRoutes(app);
openaiRoutes(app);
quickEntryRoutes(app);
notesRoutes(app);
tasksRoutes(app);

// On enregistre le middleware CORS
cors(app);

// On définit la route racine pour vérifier que l'API fonctionne
app.get('/', async (request, reply) => {
    try {
        console.log('GET /');
        reply.send({ hello: 'world' });
    } catch(err) {
        console.error(err);
    }
});

// On démarre le serveur sur le port 3000
const start = async () => {
    try {
        await app.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server is running on http://localhost:3000');
    } catch (err) {
        console.error('Error starting server:', err); // On affiche l'erreur dans la console
        process.exit(1);
    }
};

start();