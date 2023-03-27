import { z } from 'zod';
import { Messages } from '../utils';

export const createUserSchema = z.object({
  username: z.string({
    required_error: Messages.MESSAGE_FIELD_REQUIRED('username'),
  }),
  email: z
    .string({
      required_error: Messages.MESSAGE_FIELD_REQUIRED('username'),
    })
    .email({
      message: Messages.MESSAGE_FIELD_EMAIL('email'),
    }),
  password: z.string({
    required_error: Messages.MESSAGE_FIELD_REQUIRED('username'),
  }),
  passwordConfirm: z.string({
    required_error: Messages.MESSAGE_FIELD_REQUIRED('username'),
  }),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
