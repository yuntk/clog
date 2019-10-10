/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('application', {
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    subscriber_user_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'subscriber',
        key: 'user_email'
      }
    }
  }, {
    tableName: 'application'
  });
};
