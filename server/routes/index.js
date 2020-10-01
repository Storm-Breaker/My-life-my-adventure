const router = require ('express').Router()
const confirmPassword = require ('../middlewares/confirm_pass')
const UserController = require ('../controllers/users')
const App = require('../controllers/app')

router.post('/login', )
router.post ('/register', confirmPassword, UserController.register)
router.post('/apps', App.create)
router.delete('/apps/:id', App.delete)

module.exports =router