import { z } from 'zod';
import { MessagesZod } from '../utils';

export const updateTaskSchema = z.object({
  name: z
    .string({ required_error: MessagesZod.MESSAGE_FIELD_REQUIRED('name') })
    .optional(),
  description: z
    .string({
      required_error: MessagesZod.MESSAGE_FIELD_REQUIRED('description'),
    })
    .optional(),
});

export type UpdateTaskInput = z.TypeOf<typeof updateTaskSchema>;
