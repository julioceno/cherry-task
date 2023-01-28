import { z } from 'zod';
import { MessagesZod } from '../utils';

export const createUserSchema = z.object({
  username: z.string({
    required_error: MessagesZod.MESSAGE_FIELD_REQUIRED('username'),
  }),
  email: z
    .string({
      required_error: MessagesZod.MESSAGE_FIELD_REQUIRED('username'),
    })
    .email({
      message: MessagesZod.MESSAGE_FIELD_EMAIL('email'),
    }),
  password: z.string({
    required_error: MessagesZod.MESSAGE_FIELD_REQUIRED('username'),
  }),
  passwordConfirm: z.string({
    required_error: MessagesZod.MESSAGE_FIELD_REQUIRED('username'),
  }),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
