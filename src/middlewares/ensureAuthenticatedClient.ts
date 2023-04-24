import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { CustomError } from '../utils/CustomError';

export async function ensureAuthenticatedClient(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new CustomError('Token missing', 401);
    }

    const [, token] = authHeader.split(' ');

    const { sub } = verify(token, process.env.JWT_SECRET as string);

    req.client_uuid = sub as string;

    return next();
  } catch (error: any) {
    return res
      .status(error.status || 500)
      .send(error.message || 'Something went wrong verifying token.');
  }
}
