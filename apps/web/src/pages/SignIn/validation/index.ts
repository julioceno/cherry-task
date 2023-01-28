import { z } from 'zod';
import { MessagesZod } from '../../../utils/messages';

const LoginSchema = z.object({
  user: z.string({
    required_error: MessagesZod.MESSAGE_REQUIRED,
  }),
  password: z.string({
    required_error: MessagesZod.MESSAGE_REQUIRED,
  }),
});

export { LoginSchema };
