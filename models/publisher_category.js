/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('publisher_category', {
    category_category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'category',
        key: 'category_id'
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
    tableName: 'publisher_category'
  });
};
