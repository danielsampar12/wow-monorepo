import { Child } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';

interface ICreateChildUseCase {
  child_uuid: string;
  child: Omit<
    Partial<Child>,
    'uuid' | 'created_at' | 'updated_at' | 'user_uuid'
  >;
}

export class UpdateChildUseCase {
  async execute({ child, child_uuid }: ICreateChildUseCase) {
    try {
      if (!child_uuid) throw new CustomError('Child uuid is missing', 400);

      return await prisma.child.update({
        where: {
          uuid: child_uuid,
        },
        data: child,
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
