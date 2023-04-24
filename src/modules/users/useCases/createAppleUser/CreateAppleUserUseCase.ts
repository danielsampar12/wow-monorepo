import appleSignin from 'apple-signin-auth';

import { sign } from 'jsonwebtoken';
import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';
import { excludeUserKey } from '../../../../utils/excludeUserKey';
import { getMissingData } from '../../../../utils/getMissingData';

interface ICreateAppleUserUseCase {
  fullName: string;
  identityToken: string;
}

export class CreateAppleUserUseCase {
  convertStringToBoolean(is_private_email: boolean | 'true' | 'false') {
    if (typeof is_private_email === 'boolean') return is_private_email;

    return is_private_email === 'true' ? true : false;
  }

  async execute({ fullName, identityToken }: ICreateAppleUserUseCase) {
    try {
      if (!fullName || !identityToken) {
        const getMissingProp = getMissingData({
          fullName,
          identityToken,
        });

        throw new CustomError(`Missing props: [${getMissingProp}]`, 400);
      }

      const clientId = process.env.APPLE_ID;

      const {
        email,
        is_private_email,
        sub: userAppleId,
      } = await appleSignin.verifyIdToken(identityToken, {
        audience: clientId,
        ignoreExpiration: true, // ignore token expiry (never expires)
      });

      const user = await prisma.user.create({
        data: {
          email,
          name: fullName,
          apple_id: userAppleId,
          login_provider: 'APPLE',
          is_private_email: this.convertStringToBoolean(is_private_email),
        },
        include: {
          age_groups: true,
          categories: true,
        },
      });

      const token = sign({ email }, process.env.JWT_SECRET as string, {
        subject: user.uuid,
        expiresIn: '30d',
      });

      const userWithoutPassword = excludeUserKey(user, 'password');

      return { user: userWithoutPassword, token };
    } catch (error: any) {
      throw new CustomError(error.message, error.status);
    }
  }
}
