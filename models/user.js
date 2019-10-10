/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    username: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    user_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
