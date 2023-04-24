import logEventValidation, { LogObject } from '../validations';

import { prisma } from '../../../database/prismaClient';

class LogEventController {
  async handle(data: LogObject) {
    try {
      const log = logEventValidation.handle(data);
      const {
        type,
        userId,
        datetime,
        endDatetime,
        announcementId,
        articleId,
        eventId,
        placeId,
        search,
        location,
      } = log;

      const generatedLog = await prisma.applicationLogs.create({
        data: {
          type,
          created_user_uuid: userId,
          initial_date: datetime,
          final_date: endDatetime,
          annoucement_uuid: announcementId,
          article_uuid: articleId,
          event_uuid: eventId,
          place_uuid: placeId,
          search_text: search,
        },
      });

      if (type === 'location' && location) {
        const { latitude, longitude } = location;

        await prisma.$queryRaw`
          UPDATE application_logs al
          SET location = ST_MakePoint(${latitude},${longitude})
          WHERE al.uuid = ${generatedLog.uuid};
      `;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default new LogEventController();
