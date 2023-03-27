import { z } from 'zod';
import { Messages } from '../utils';

export const authenticateSchema = z.object({
  username: z.string({
    required_error: Messages.MESSAGE_FIELD_REQUIRED('username'),
  }),
  password: z.string({
    required_error: Messages.MESSAGE_FIELD_REQUIRED('username'),
  }),
});

export type AuthenticateInput = z.TypeOf<typeof authenticateSchema>;
