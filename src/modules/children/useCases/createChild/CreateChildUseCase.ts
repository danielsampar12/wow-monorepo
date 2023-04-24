import { Child } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';

interface ICreateChildUseCase {
  child: Omit<Child, 'uuid' | 'created_at' | 'updated_at'>;
}

export class CreateChildUseCase {
  async execute({ child }: ICreateChildUseCase) {
    try {
      return await prisma.child.create({
        data: child,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
