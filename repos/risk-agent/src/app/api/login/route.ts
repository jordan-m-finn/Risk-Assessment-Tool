import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from '@/db/database';
import { User } from '@/types/user';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  try {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, user: User) => {
          if (err) {
            resolve(NextResponse.json({ error: "Authentication failed" }, { status: 500 }));
            return;
          }

          if (!user) {
            resolve(NextResponse.json({ error: "User not found" }, { status: 401 }));
            return;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            resolve(NextResponse.json({ error: "Incorrect password" }, { status: 401 }));
            return;
          }

          resolve(NextResponse.json({ 
            user: {
              id: user.id,  // Now properly typed
              email: user.email,
              firstName: user.first_name,
              lastName: user.last_name
            }
          }, { status: 200 }));
        }
      );
    });
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}