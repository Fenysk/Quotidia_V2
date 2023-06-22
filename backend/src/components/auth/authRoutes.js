import { registerUser, loginUser } from './authService.js';
import { verifyToken } from '../../utils/tokenUtils.js'

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

    app.post(

        '/isValidToken', // Route

        async (request, reply) => { // Handler
            console.log('POST /isValidToken');
            const { token } = request.body;
            const decodedToken = verifyToken(token);
            reply.send(decodedToken);
        });

}