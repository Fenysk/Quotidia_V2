import { openaiChat } from '../../services/openai/openaiService.js';

export default function openaiRoutes(app) {

    app.post('/openai/chat', async (request, reply) => {
        console.log('POST /openai/chat');
        const message = request.body.message;
        const openaiResponse = await openaiChat(message);
        reply.send(openaiResponse);
    });

}