/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('application_category', {
    category_category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'category',
        key: 'category_id'
      }
    },
    application_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'application',
        key: 'id'
      }
    }
  }, {
    tableName: 'application_category'
  });
};
