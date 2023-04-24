import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';
import { excludeUserKey } from '../../../../utils/excludeUserKey';

interface IAuthenticateGoogleUser {
  idToken: string;
}

export type UserPayload = Omit<User, 'password'>;

export class AuthenticateGoogleUserUseCase {
  async execute({ idToken }: IAuthenticateGoogleUser) {
    try {
      const axios = require('axios');

      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`,
      );

      const user = await prisma.user.findUnique({
        where: { email: data.email },
        include: { age_groups: true, categories: true, children: true },
      });

      if (!user) {
        const newUser = await prisma.user.create({
          data: {
            email: data.email,
            name: data.name,
            login_provider: 'GOOGLE',
          },
        });

        const userWithoutPasswordInfo = excludeUserKey(newUser, 'password');

        const token = sign(
          { email: newUser.email },
          process.env.JWT_SECRET as string,
          {
            subject: newUser.uuid,
            expiresIn: '30d',
          },
        );

        return { token, user: userWithoutPasswordInfo };
      }

      if (!user.is_active) {
        throw new CustomError('Inactive user!', 400);
      }

      const userWithoutPasswordInfo = excludeUserKey(user, 'password');

      const token = sign(
        { email: user.email },
        process.env.JWT_SECRET as string,
        {
          subject: user.uuid,
          expiresIn: '30d',
        },
      );

      return { token, user: userWithoutPasswordInfo };
    } catch (error: any) {
      console.log({ AuthenticateGoogleUserUseCaseError: `[${error}]` });

      throw new CustomError('Failed to log in with Google!', error.status);
    }
  }
}
