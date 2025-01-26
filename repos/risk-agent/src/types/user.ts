export interface User {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  telegram_id: string | null;
}