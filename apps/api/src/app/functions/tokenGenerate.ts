import jwt from 'jsonwebtoken';
import { config } from '../../config';

function tokenGenerate(userId: string) {
  const secret = config.secret;

  const token = jwt.sign({ id: userId }, secret, {
    expiresIn: '5m',
  });

  return token;
}

export { tokenGenerate };
