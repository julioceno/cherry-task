import { z } from 'zod';
import { MessagesZod } from '../utils';

export const createTaskSchema = z.object({
  name: z
    .string({ required_error: MessagesZod.MESSAGE_FIELD_REQUIRED('name') })
    .optional(),
  description: z
    .string({
      required_error: MessagesZod.MESSAGE_FIELD_REQUIRED('description'),
    })
    .optional(),
});

export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>;
