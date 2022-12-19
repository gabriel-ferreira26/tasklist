import jwt from 'jsonwebtoken';
import User from '../models/user';

require('dotenv').config();

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuario não existe.' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta!' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, process.env.HASH_SECRET, {
        expiresIn: '1h',
      }),
    });
  }
}

export default new SessionController();
