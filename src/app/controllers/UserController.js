/* eslint-disable class-methods-use-this */
import User from '../models/user';

class UserController {
  async store(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;

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
}

export default new UserController();
