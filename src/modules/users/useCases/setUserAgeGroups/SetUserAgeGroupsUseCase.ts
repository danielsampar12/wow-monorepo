import { prisma } from '../../../../database/prismaClient';

interface ISetUserAgeGroupsUseCase {
  age_groups_uuids: string[];
  user_uuid: string;
}

export class SetUserAgeGroupsUseCase {
  async execute({ age_groups_uuids, user_uuid }: ISetUserAgeGroupsUseCase) {
    try {
      return await prisma.user.update({
        where: {
          uuid: user_uuid,
        },
        data: {
          age_groups: {
            set: age_groups_uuids.map((uuid) => ({
              uuid,
            })),
          },
        },
        include: {
          age_groups: true,
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
