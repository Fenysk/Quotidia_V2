import { getUsers, getUserById, updateUser, deleteUser } from '../../services/users/usersService.js';

export default function userRoutes(app) {

    app.get('/users', async (request, reply) => {
        console.log('GET /users');
        const users = await getUsers();
        reply.send(users);
    });

    app.get('/users/:id', async (request, reply) => {
        console.log('GET /users/:id');
        const user = await getUserById(Number(request.params.id));
        reply.send(user);
    });

    app.patch('/users/:id', async (request, reply) => {
        console.log('PATCH /users/:id');
        const user = await updateUser(Number(request.params.id), request.body);
        reply.send(user);
    });

    app.delete('/users/:id', async (request, reply) => {
        console.log('DELETE /users/:id');
        const user = await deleteUser(Number(request.params.id));
        reply.send(user);
    });

}