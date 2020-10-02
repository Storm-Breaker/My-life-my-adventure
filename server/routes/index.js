const router = require ('express').Router()
const confirmPassword = require ('../middlewares/confirm_pass')
const UserController = require ('../controllers/users')
const App = require('../controllers/app')
const authentication = require('../middlewares/authentication')


router.get('/apps', App.fetch)
router.post('/apps', App.create)
router.delete('/apps/:id', authentication,  App.delete)
router.post ('/register', confirmPassword, UserController.register)
router.post ('/login', UserController.login)
router.post ('/googleSignIn', UserController.googleSignIn)
router.put  ('edit/:id', authentication, App.editAll)
router.patch('edit/:id', authentication, App.changeStatus)



module.exports =router