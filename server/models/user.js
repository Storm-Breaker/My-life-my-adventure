'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `please fill your first name`
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `please fill your last name`
        }
      }
    },
    birthDate: DataTypes.DATE,
    email: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `please fill your email`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : `please fill your password`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};