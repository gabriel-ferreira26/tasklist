import Sequelize, { Model } from 'sequelize';

class Task extends Model {
  static init(sequelize) {
    super.init({
      title: sequelize.STRING,
      description: sequelize.STRING,
      check: sequelize.BOOLEAN,
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.user, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Task;
