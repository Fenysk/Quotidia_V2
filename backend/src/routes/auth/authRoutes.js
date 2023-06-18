import { registerUser, loginUser } from '../../services/auth/authService.js';

export default function authRoutes(app) {

    app.post('/register', async (request, reply) => {
        console.log('POST /register');
        const { username, email, password } = request.body;
        const user = await registerUser(username, email, password);
        reply.send(user);
    });

    app.post('/login', async (request, reply) => {
        console.log('POST /login');
        const { email, password } = request.body;
        const user = await loginUser(email, password);
        reply.send(user);
    });

}