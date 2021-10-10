import jwt from 'jsonwebtoken';

const KEY = process.env.TOKEN_API_KEY as string;
const EXPIRATION = process.env.TOKEN_EXPIRATION as string;

export const createToken = (): string | undefined =>
  jwt.sign({ data: { user: 'CRSS' } }, KEY, { expiresIn: EXPIRATION });

export const verifyToken = (token: string): Promise<boolean> => {
  return new Promise((resolve) => {
    jwt.verify(token, KEY, (error) => {
      if (error) {
        resolve(false);
      }
      resolve(true);
    });
  });
};
