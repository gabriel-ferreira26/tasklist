import { Router } from 'express';
import User from './app/models/user';

const routes = new Router();

routes.post('/', async (req, res) => {
  const user = await User.create({
    first_name: 'Gabriel Augusto',
    last_name: 'Ferreira',
    email: 'teste@teste.com',
    password_hash: '1231230',
  });
  res.json({ user });
});

export default routes;
