import { z } from 'zod';
import { LoginSchema } from '../validation';

export type ILoginForm = z.infer<typeof LoginSchema>;
