const MessagesZod = {
  MESSAGE_REQUIRED: 'O campo em específico é obrigatório.',

  MESSAGE_FIELD_REQUIRED: (field: string) =>
    `O campo '${field} é obrigatório.'`,

  MESSAGE_FIELD_STRING: (field: string) =>
    `O campo '${field} deve ser uma string.'`,

  MESSAGE_FIELD_EMAIL: (field: string) =>
    `O campo '${field} deve ser um email.'`,

  MESSAGE_FIELD_UUID: (field: string) => `O campo '${field} deve ser um uuid.'`,

  MESSAGE_FIELD_BOOLEAN: (field: string) =>
    `O campo '${field} deve ser um booleano.'`,
};

export { MessagesZod };
