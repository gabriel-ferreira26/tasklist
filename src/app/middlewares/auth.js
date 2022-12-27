import jwt from 'jsonwebtoken';
import { promisify } from 'util';

require('dotenv').config();

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não existe' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.HASH_SECRET);

    req.userId = decoded.id;

    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Token invalido' });
  }
};
