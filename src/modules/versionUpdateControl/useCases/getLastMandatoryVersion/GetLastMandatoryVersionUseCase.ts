import { prisma } from '../../../../database/prismaClient';

export class GetLastMandatoryVersionUseCase {
  async execute() {
    try {
      const versions = await prisma.versionUpdateControl.findMany({
        where: {
          is_mandatory: true,
          release_date: {
            lt: new Date()
          }
        },
        orderBy: {
          release_date: 'desc',
        },
      });

      return versions?.length ? versions[0].version : null;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
