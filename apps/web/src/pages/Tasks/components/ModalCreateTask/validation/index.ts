import { z } from 'zod';
import { MessagesZod } from '../../../../../utils';

const CreateTaskSchema = z.object({
  name: z.string({
    required_error: MessagesZod.MESSAGE_REQUIRED,
  }),
  type: z.string({
    required_error: MessagesZod.MESSAGE_REQUIRED,
  }),
  dataFinalizar: z.string({
    required_error: MessagesZod.MESSAGE_REQUIRED,
  }),
});

export { CreateTaskSchema };
