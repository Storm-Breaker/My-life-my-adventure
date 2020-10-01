'use strict';
const bcryptjs = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
     
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
    hooks :{
      beforeCreate (user) {
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(user.password, salt)
        user.password = hash
      }
    }
  });
  return User;
};