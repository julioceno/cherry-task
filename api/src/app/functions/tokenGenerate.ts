import jwt from 'jsonwebtoken';

interface TokenGenerateProps {
  id: string;
  email: string;
  password: string;
}

function tokenGenerate(params: TokenGenerateProps) {
  // TODO: fazer Pegar diretamente do env
  const secret = '62178bf11c643983d8ff35113dab7bd8';

  const token = jwt.sign({ id: params.id }, secret, {
    expiresIn: '1d',
  });

  return token;
}

export { tokenGenerate };
