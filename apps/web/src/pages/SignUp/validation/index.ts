import { z } from 'zod';
import { MessagesZod } from '../../../utils/messages';

const CreateUserSchema = z.object({
  username: z.string({
    required_error: MessagesZod.MESSAGE_REQUIRED,
  }),
  email: z
    .string({
      required_error: MessagesZod.MESSAGE_REQUIRED,
    })
    .email({
      message: MessagesZod.MESSAGE_EMAIL,
    }),
  password: z.string({
    required_error: MessagesZod.MESSAGE_REQUIRED,
  }),
  passwordConfirm: z.string({
    required_error: MessagesZod.MESSAGE_REQUIRED,
  }),
});

export { CreateUserSchema };
