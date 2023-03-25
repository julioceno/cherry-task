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
  steps: z.array(
    z.object({
      id: z.string(),
      label: z.string().optional(),
      checked: z.boolean(),
    })
  ),
});

export type UpdateTaskInput = z.TypeOf<typeof updateTaskSchema>;
