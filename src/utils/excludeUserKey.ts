import { User } from '@prisma/client';

type Key = keyof User;

export function excludeUserKey(user: User, ...keys: Key[]) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
