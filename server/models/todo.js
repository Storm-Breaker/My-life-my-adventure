'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    location: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isValid (value){
          if (value < new Date()){
            throw new Error (`tanggal tidak valid`)
          }
        }
      }
    },
    weather: DataTypes.STRING,
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};