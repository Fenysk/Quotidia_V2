import { verifyToken } from "../utils/tokenUtils.js";

export const middlewareToken = (request, reply, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token);
        const userId = decodedToken.userId;

        // Ajoutez les informations du token à l'objet request pour qu'elles soient disponibles dans les routes suivantes si nécessaire
        request.token = decodedToken;
        request.userId = userId;

        next(); // Passez le contrôle à la fonction suivante
    } catch (error) {
        console.error('Token verification failed:', error);
        reply.status(401).send({ error: 'Token verification failed' });
    }
};