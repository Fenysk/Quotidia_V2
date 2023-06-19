import { registerUser, loginUser } from './authService.js';

export default function authRoutes(app) {

    app.post(

        '/register', // Route

        async (request, reply) => { // Handler
            console.log('POST /register');
            const { username, email, password } = request.body;
            const user = await registerUser(username, email, password);
            reply.send(user);
        });

    app.post(

        '/login', // Route
        
        async (request, reply) => { // Handler
            console.log('POST /login');
            const { email, password } = request.body;
            const user = await loginUser(email, password);
            reply.send(user);
        });

}