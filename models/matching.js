/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('matching', {
    application_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'application',
        key: 'id'
      }
    },
    publisher_user_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'publisher',
        key: 'user_email'
      }
    }
  }, {
    tableName: 'matching'
  });
};
