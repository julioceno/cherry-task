import { z } from 'zod';
import { LoginSchema } from '../validation';

export type LoginInput = z.infer<typeof LoginSchema>;

export interface User {
  id: string;
  username: string;
  email: string;
}
