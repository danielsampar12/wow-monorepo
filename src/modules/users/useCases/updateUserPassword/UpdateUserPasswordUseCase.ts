import { prisma } from '../../../../database/prismaClient';
import { hash } from 'bcrypt';
import { CustomError } from '../../../../utils/CustomError';

interface UpdateUserPasswordInput {
  idToken: string;
  newPassword: string;
}

export class UpdateUserPasswordUseCase {
  async execute({ idToken, newPassword }: UpdateUserPasswordInput) {
    try {
      if (!newPassword) {
        throw new CustomError('New password must be not null', 400);
      }

      const passwordRecoveryToken = await prisma.passwordRecoveryToken.findUnique({
        where: { uuid: idToken },
        select: {
          created_user_uuid: true,
          is_verified: true
        }
      });

      if (!passwordRecoveryToken) {
        throw new CustomError('Invalid id token', 400);
      }

      if (!passwordRecoveryToken.is_verified) {
        throw new CustomError('This token has not been verified', 400);
      }

      const user = await prisma.user.findUnique({
        where: { uuid: passwordRecoveryToken.created_user_uuid },
        select: { uuid: true }
      });

      if (!user) {
        throw new CustomError('User not found', 400);
      }

      const hashedPassword = await hash(newPassword, 10);

      await prisma.user.update({
        where: { uuid: user.uuid },
        data: {
          password: hashedPassword,
          updated_at: new Date(),
        }
      });

      return true;
    } catch (error: any) {
      throw new CustomError(error.message, error.status);
    }
  }
}
