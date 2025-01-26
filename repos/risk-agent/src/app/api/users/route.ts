import { NextResponse } from "next/server";
import db from '@/db/database';

export async function GET() {
  try {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT id, email, first_name, last_name, phone_number, address, telegram_id FROM users',
        [],
        (err, users) => {
          if (err) {
            resolve(NextResponse.json({ error: "Failed to fetch users" }, { status: 500 }));
            return;
          }
          
          resolve(NextResponse.json({ users }, { status: 200 }));
        }
      );
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}