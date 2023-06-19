import { openaiChat } from './openaiService.js';
import { middlewareToken } from '../../middleware/token.js';

export default function openaiRoutes(app) {

    app.post(

        '/openai/chat', // Route
        
        { preHandler: middlewareToken }, // Middleware

        async (request, reply) => { // Handler
            console.log('POST /openai/chat');
            const message = request.body.message;
            const openaiResponse = await openaiChat(request.userId, message);

            reply.send(openaiResponse);

        });

}