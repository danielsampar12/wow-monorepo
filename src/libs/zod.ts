import { z } from 'zod';

const datestring = () =>
  z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date());

export default { ...z, datestring };
