import { z } from 'zod';
import { LoginSchema } from '../validation';

export type LoginInput = z.infer<typeof LoginSchema>;
