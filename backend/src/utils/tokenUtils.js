import jwt from 'jsonwebtoken';

export const generateToken = (user) => {

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: '1h',
    });

    return token;
};

export const verifyToken = (token) => {
    const secretKey = process.env.SECRET_KEY;

    try {
        const decodedToken = jwt.verify(token, secretKey);
        return decodedToken;
    } catch (error) {
        console.error('Error verifying token:', error);
        throw new Error('Failed to verify token');
    }
};

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