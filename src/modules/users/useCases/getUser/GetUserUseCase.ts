import { prisma } from '../../../../database/prismaClient';

import { excludeUserKey } from '../../../../utils/excludeUserKey';

interface IGetUserUseCase {
  uuid: string;
}

export class GetUserUseCase {
  async execute({ uuid }: IGetUserUseCase) {
    try {
      const user = await prisma.user.findUnique({
        where: { uuid },
        include: {
          children: true,
          categories: {
            include: {
              children: true,
            },
          },
          age_groups: true,
        },
      });

      if (!user) {
        throw new Error('User not found.');
      }

      const userWithoutPassword = excludeUserKey(user, 'password');

      return userWithoutPassword;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
