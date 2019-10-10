/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('publisher', {
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
    tableName: 'publisher'
  });
};
