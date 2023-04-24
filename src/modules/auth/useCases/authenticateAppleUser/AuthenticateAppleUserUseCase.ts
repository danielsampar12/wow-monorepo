import appleSignin from 'apple-signin-auth';

import { sign } from 'jsonwebtoken';

import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';
import { excludeUserKey } from '../../../../utils/excludeUserKey';
import { CreateAppleUserUseCase } from '../../../users/useCases/createAppleUser/CreateAppleUserUseCase';

interface IAuthenticateAppleUserUseCase {
  identityToken: string;
  fullName: string;
}

export class AuthenticateAppleUserUseCase {
  async execute({ identityToken, fullName }: IAuthenticateAppleUserUseCase) {
    try {
      const clientId = process.env.APPLE_ID;

      const { sub: userAppleId } = await appleSignin.verifyIdToken(
        identityToken,
        {
          audience: clientId,
          ignoreExpiration: true, // ignore token expiry (never expires)
        },
      );

      const user = await prisma.user.findUnique({
        where: { apple_id: userAppleId },
        include: { age_groups: true, categories: true, children: true },
      });

      if (user && !user.is_active) {
        throw new CustomError('User not found!', 400);
      }

      if (!user) {
        const createAppleUserUseCase = new CreateAppleUserUseCase();

        const { token, user } = await createAppleUserUseCase.execute({
          identityToken,
          fullName,
        });

        const userWithoutPasswordInfo = excludeUserKey(user, 'password');

        return { token, user: userWithoutPasswordInfo };
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
      throw new CustomError(error.messsage, error.status);
    }
  }
}
