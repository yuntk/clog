/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subscriber', {
    user_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'email'
      }
    }
  }, {
    tableName: 'subscriber'
  });
};
