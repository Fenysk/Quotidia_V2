import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    
    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: '1h',
    });

    return token;
};