/* eslint-disable class-methods-use-this */
import * as yup from 'yup';
import User from '../models/user';

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(8).max(16),
    });

    const {
      firstName, lastName, email, password,
    } = req.body;

    if (!(await schema.isValid({
      firstName, lastName, email, password,
    }))) {
      return res.status(400).json({ error: 'Envie os dados corretamente!' });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(401).json({ error: 'Email já cadastrado' });
    }

    const { id, name } = await User.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExist = await User.findOne({
        where: {
          email,
        },
      });

      if (userExist) {
        return res.status(401).json({ error: 'Email já cadastrado!' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha incorreta!' });
    }

    const { id, first_name, last_name } = await user.update(req.body);

    return res.json({
      id,
      first_name,
      last_name,
      email,
    });
  }
}

export default new UserController();
