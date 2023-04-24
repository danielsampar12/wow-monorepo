import { sign } from 'jsonwebtoken';
import { prisma } from '../../../../database/prismaClient';
import { excludeUserKey } from '../../../../utils/excludeUserKey';

interface ICreateGoogleUserUseCase {
  name: string;
  email: string;
}

export class CreateGoogleUserUseCase {

  async execute({ name, email }: ICreateGoogleUserUseCase) {
    try {
      const sameEmail = await prisma.user.findUnique({
        where: { email: email },
        select: { email: true },
      });

      if (sameEmail) {
        throw new Error('Unavailable E-mail');
      }

      const user = await prisma.user.create({
        data: {
          email,
          name,
          login_provider: 'GOOGLE'
        },
        include: {
          age_groups: true,
          categories: true,
        },
      });

      const token = sign(
        { email: email },
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
