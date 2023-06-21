import { updateTask, deleteTask } from './tasksService.js';
import { middlewareToken } from '../../middleware/token.js';

export default function tasksRoutes(app) {

    app.patch(

        '/tasks/:id', // Route

        { preHandler: middlewareToken }, // Middleware

        async (request, reply) => { // Handler

            const userId = request.userId;
            const taskId = Number(request.params.id);
            const taskData = request.body;

            console.log('PATCH /tasks/:id');
            const task = await updateTask(userId, taskId, taskData);

            reply.send(task);
        });


    app.delete(

        '/tasks/:id', // Route

        { preHandler: middlewareToken }, // Middleware

        async (request, reply) => { // Handler

            const userId = request.userId;
            const taskId = Number(request.params.id);

            console.log('DELETE /tasks/:id');
            const task = await deleteTask(userId, taskId);

            reply.send(task);
        });

}
