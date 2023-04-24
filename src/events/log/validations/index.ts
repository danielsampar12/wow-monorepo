import z from '../../../libs/zod';

const logSchema = z.object({
  type: z.union([
    z.literal('navigation'),
    z.literal('event'),
    z.literal('place'),
    z.literal('article'),
    z.literal('announcement'),
    z.literal('search'),
    z.literal('location'),
  ]),
  userId: z.string(),
  datetime: z.datestring(),
  placeId: z.optional(z.string()),
  eventId: z.optional(z.string()),
  articleId: z.optional(z.string()),
  announcementId: z.optional(z.string()),
  search: z.optional(z.string()),
  endDatetime: z.optional(z.datestring()),
  location: z.optional(
    z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  ),
});

export type LogObject = Zod.infer<typeof logSchema>;

class LogEventValidation {
  handle(data: Record<string, any>): LogObject {
    const response = logSchema.safeParse(data);
    const { success } = response;
    if (success) {
      const { data } = response;
      return data;
    }

    const { error } = response;
    throw error;
  }
}

export default new LogEventValidation();
