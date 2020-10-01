const router = require ('express').Router()
const confirmPassword = require ('../middleware/confirm_pass')
const UserController = require ('../controllers/users')
const AppController = require ('../controllers/app')

router.post ('/register', confirmPassword, UserController.register)
router.post ('/login', UserController.login)
router.put  ('edit/:id', AppController.editAll)
router.patch('edit/:id', AppController.changeStatus)



module.exports =router