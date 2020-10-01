const router = require ('express').Router()
const confirmPassword = require ('../middleware/confirm_pass')
const UserController = require ('../controllers/users')
const AppController = require ('../controllers/app')



router.post ('/register', confirmPassword, UserController.register)




module.exports =router