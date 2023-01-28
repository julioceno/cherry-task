import { z } from 'zod';
import { CreateUserSchema } from '../validation';

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
