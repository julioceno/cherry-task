import jwt from 'jsonwebtoken';
import { config } from '../../config';

interface TokenGenerateProps {
  id: string;
  email: string;
  password: string;
}

function tokenGenerate(params: TokenGenerateProps) {
  const secret = config.secret;

  const token = jwt.sign({ id: params.id }, secret, {
    expiresIn: '10d',
  });

  return token;
}

export { tokenGenerate };
