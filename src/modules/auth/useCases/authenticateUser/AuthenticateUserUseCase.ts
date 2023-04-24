import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';
import { excludeUserKey } from '../../../../utils/excludeUserKey';

interface IAuthenticateUser {
  email: string;
  password: string;
}

export type UserPayload = Omit<User, 'password'>;

export class AuthenticateUserUseCase {
  async execute({ email, password }: IAuthenticateUser) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
        include: { age_groups: true, categories: true, children: true },
      });

      if (!user || !user.password) {
        throw new CustomError('Email or password invalid!', 400);
      }

      if (!user.is_active) {
        throw new CustomError('User not found!', 400);
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new CustomError('Email or password invalid!', 400);
      }

      const userWithoutPasswordInfo = excludeUserKey(user, 'password');

      const token = sign({ email }, process.env.JWT_SECRET as string, {
        subject: user.uuid,
        expiresIn: '30d',
      });

      return { token, user: userWithoutPasswordInfo };
    } catch (error: any) {
      console.log({ AuthenticateUserUseCaseError: `[${error}]` });

      throw new CustomError('Email or password invalid!', error.status);
    }
  }
}
