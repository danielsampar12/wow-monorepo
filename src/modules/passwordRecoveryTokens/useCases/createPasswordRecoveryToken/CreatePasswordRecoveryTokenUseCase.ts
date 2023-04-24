import { PasswordRecoveryToken } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';
import { getRandomInt } from '../../../../utils/getRandomInt';
import { sendMail } from '../../../../utils/sendMail';

type CreatePasswordRecoveryTokenPrisma = Omit<
  PasswordRecoveryToken,
  'created_at' | 'updated_at' | 'uuid'
>;

interface CreatePasswordRecoveryTokenInput {
  email: string;
}

export class CreatePasswordRecoveryTokenUseCase {
  async execute({ ...params }: CreatePasswordRecoveryTokenInput) {
    try {
      const min = 100000;
      const max = 999999;

      const { email } = params;

      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          uuid: true,
          name: true,
          login_provider: true,
        },
      });

      if (!user) {
        throw new CustomError('User not found for the given email', 400);
      }

      if (['GOOGLE', 'FACEBOOK', 'APPLE'].includes(user.login_provider)) {
        throw new CustomError(
          'Users from Google, Facebook or Apple providers cannot reset their own passwords',
          403,
        );
      }

      const recoveryToken = getRandomInt(min, max);

      const message = `Olá <strong>${user.name}</strong>, <br> <br> Aqui está seu código de recuperação de senha. <strong>${recoveryToken}</strong>. <br> <br> Atenciosamente, <br> Time WOW APP.`;
      await sendMail('WOW APP - Recovery Password Request', message, [email]);

      const passwordRecoveryToken: CreatePasswordRecoveryTokenPrisma = {
        created_user_uuid: user.uuid,
        is_verified: false,
        recovery_token: recoveryToken.toString(),
        updated_user_uuid: user.uuid,
      };

      const createdPasswordRecoveryToken =
        await prisma.passwordRecoveryToken.create({
          data: passwordRecoveryToken,
        });

      return createdPasswordRecoveryToken.uuid;
    } catch (error: any) {
      throw new CustomError(error.message, error.status);
    }
  }
}
