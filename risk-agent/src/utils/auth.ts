import db from '@/db/database';

export const checkUserExists = (email: string): Promise<boolean> => {
  return new Promise((resolve) => {
    db.get(
      'SELECT id FROM users WHERE email = ?',
      [email],
      (err, user) => {
        resolve(!!user);
      }
    );
  });
};