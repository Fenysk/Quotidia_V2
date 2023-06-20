import jwt from 'jsonwebtoken';

export const generateToken = (user) => {

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: '1d',
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