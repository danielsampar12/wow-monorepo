import { prisma } from '../../../../database/prismaClient';
import { CustomError } from '../../../../utils/CustomError';

interface IDeleteChildUseCase {
  child_uuid: string;
}

export class DeleteChildUseCase {
  async execute({ child_uuid }: IDeleteChildUseCase) {
    try {
      if (!child_uuid)
        throw new CustomError('Missing child uuid on params', 400);

      return await prisma.child.delete({
        where: { uuid: child_uuid },
      });
    } catch (error: any) {
      throw new CustomError(error.message, error.status || 500);
    }
  }
}
