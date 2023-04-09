import { z } from 'zod';
import { Messages } from '../utils';

export const refreshTokenSchema = z.object({
  refreshToken: z.string().uuid({ message: Messages.MESSAGE_FIELD_UUID('id') }),
});

export type RefreshTokenInput = z.TypeOf<typeof refreshTokenSchema>;
