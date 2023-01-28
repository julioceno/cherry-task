const MessagesZod = {
  MESSAGE_REQUIRED: 'O campo em específico é obrigatório.',

  MESSAGE_FIELD_REQUIRED: (field: string) =>
    `O campo '${field} é obrigatório.'`,

  MESSAGE_FIELD_EMAIL: (field: string) =>
    `O campo '${field} deve ser um email.'`,
};

export { MessagesZod };
