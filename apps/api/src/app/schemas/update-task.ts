import { z } from 'zod';
import { Messages } from '../utils';

export const updateTaskSchema = z.object({
  id: z.string().uuid({ message: Messages.MESSAGE_FIELD_UUID('id') }),
  name: z
    .string({
      invalid_type_error: Messages.MESSAGE_FIELD_STRING('name'),
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: Messages.MESSAGE_FIELD_STRING('description'),
    })
    .optional(),
  steps: z.array(
    z.object({
      id: z
        .string()
        .uuid({ message: Messages.MESSAGE_FIELD_UUID('id') })
        .optional(),
      label: z
        .string({
          invalid_type_error: Messages.MESSAGE_FIELD_STRING('label'),
        })
        .optional(),
      checked: z.boolean({
        invalid_type_error: Messages.MESSAGE_FIELD_BOOLEAN('checked'),
      }),
    })
  ),
});

export type UpdateTaskInput = z.TypeOf<typeof updateTaskSchema>;
