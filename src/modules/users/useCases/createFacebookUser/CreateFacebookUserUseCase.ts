import { sign } from 'jsonwebtoken';
import { prisma } from '../../../../database/prismaClient';
import { excludeUserKey } from '../../../../utils/excludeUserKey';

interface ICreateFacebookUserUseCase {
  accessToken: string;
}

export class CreateFacebookUserUseCase {

  async execute({ accessToken }: ICreateFacebookUserUseCase) {
    try {

      const axios = require('axios');

      const { data } = await axios.get(`https://graph.facebook.com/me?fields=email,name&access_token=${accessToken}`);

      const sameEmail = await prisma.user.findUnique({
        where: { email: data.email },
        select: { email: true },
      });

      if (sameEmail) {
        throw new Error('Unavailable E-mail');
      }

      const user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          login_provider: 'FACEBOOK'
        },
        include: {
          age_groups: true,
          categories: true,
        },
      });

      const token = sign(
        { email: data.email },
        process.env.JWT_SECRET as string,
        {
          subject: user.uuid,
          expiresIn: '30d',
        },
      );

      const userWithoutPassword = excludeUserKey(user, 'password');

      return { user: userWithoutPassword, token };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
