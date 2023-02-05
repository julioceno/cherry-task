import { z } from 'zod';
import { MessagesZod } from '../../../../../utils';

const CreateTaskSchema = z.object({
  name: z.string({
    required_error: MessagesZod.MESSAGE_REQUIRED,
  }),
  type: z.string({
    required_error: MessagesZod.MESSAGE_REQUIRED,
  }),
  dateFinalize: z.date().nullable().optional(),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;

export { CreateTaskSchema };
