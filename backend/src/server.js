import fastify from 'fastify';

const app = fastify();

const start = async () => {
    try {
        await app.listen({ port: 3000 });
    } catch (err) {
        console.log(err);
        exit(1);
    }
};

start();