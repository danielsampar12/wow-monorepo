import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';
import { excludeUserKey } from '../../../../utils/excludeUserKey';

type CreateUserParams = Omit<User, 'created_at' | 'updated_at' | 'uuid'>;

interface ICreateUserUseCase extends CreateUserParams {}

export class CreateUserUseCase {
  async execute(params: ICreateUserUseCase) {
    try {
      if (params.login_provider === 'LOCAL') {
        if (!params.password) {
          throw new CustomError('É necessário informar a senha!', 400);
        }

        const sameEmail = await prisma.user.findUnique({
          where: { email: params.email },
          select: { email: true },
        });

        if (sameEmail) {
          throw new CustomError('Já existe uma conta com o e-mail informado!', 400);
        }

        const hashedPassword = await hash(params.password, 10);

        const user = await prisma.user.create({
          data: {
            ...params,
            password: hashedPassword,
          },
          include: {
            age_groups: true,
            categories: true,
          },
        });

        const token = sign(
          { email: params.email },
          process.env.JWT_SECRET as string,
          {
            subject: user.uuid,
            expiresIn: '30d',
          },
        );

        const userWithoutPassword = excludeUserKey(user, 'password');

        return { user: userWithoutPassword, token };
      }

      return { user: null, token: null };
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
