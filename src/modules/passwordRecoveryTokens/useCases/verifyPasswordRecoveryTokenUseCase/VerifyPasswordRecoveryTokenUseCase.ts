import { prisma } from '../../../../database/prismaClient';
import moment from 'moment';
import { CustomError } from '../../../../utils/CustomError';

interface VerifyPasswordRecoveryTokenInput {
  idToken: string;
  recoveryToken: string;
}

export class VerifyPasswordRecoveryTokenUseCase {
  async execute({ ...params }: VerifyPasswordRecoveryTokenInput) {
    try {
      const { idToken, recoveryToken } = params;

      console.log({ idToken, recoveryToken });

      const recoveryPasswordToken =
        await prisma.passwordRecoveryToken.findUnique({
          where: { uuid: idToken },
          select: {
            uuid: true,
            recovery_token: true,
            is_verified: true,
            created_at: true,
          },
        });

      if (!recoveryPasswordToken) {
        throw new CustomError('Invalid token', 400);
      }

      if (recoveryPasswordToken.recovery_token !== recoveryToken) {
        throw new CustomError('Incorrect code', 400);
      }

      if (recoveryPasswordToken.is_verified) {
        throw new CustomError('This code has already been verified', 400);
      }

      const creationDate = moment(recoveryPasswordToken.created_at);
      const expirationMinutes = 30;

      if (creationDate.add(expirationMinutes, 'minutes').isBefore(new Date())) {
        throw new CustomError('Expired token', 403);
      }

      await prisma.passwordRecoveryToken.update({
        where: { uuid: idToken },
        data: {
          is_verified: true,
          updated_at: new Date(),
        },
      });

      return recoveryPasswordToken.uuid;
    } catch (error: any) {
      throw new CustomError(error.message, error.status);
    }
  }
}
