import fastifyCors from '@fastify/cors';

export default function cors(app) {
    app.register(fastifyCors, {
        origin: '*', // Autorise toutes les origines
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes HTTP autorisées
        allowedHeaders: '*' // En-têtes autorisées
    });
}
