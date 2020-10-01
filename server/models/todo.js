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
      
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'invalid title'
        },
        notNull: {
          args: true,
          msg: 'invalid title'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'invalid location'
        },
        notNull: {
          args: true,
          msg: 'invalid location'
        }
      }
    } ,
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'invalid date'
        },
        notNull: {
          args: true,
          msg: 'invalid date'
        },
        isToday(value){
          if (value < new Date()){
            throw 'invali date'
          }
        }
      }
    },
    weather: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'invalid weather'
        },
        notNull: {
          args: true,
          msg: 'invalid weather'
        }
      }
    },
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};