const router = require ('express').Router()
const confirmPassword = require ('../middlewares/confirm_pass')
const UserController = require ('../controllers/users')
const App = require('../controllers/app')
const authentication = require('../middlewares/authentication')

router.post(`/googleSignIn`, UserController.googleSignIn)
router.post ('/register',confirmPassword, UserController.register)
router.post ('/login', UserController.login)

router.get('/user', App.getTodos)
router.get('/profile', authentication, UserController.getUser)
router.put ('/profile', authentication, UserController.editProfile)
router.post('/apps', App.create)

router.get('/edit/:id', authentication, App.showEdit)
router.put  ('/edit/:id', authentication, App.editAll)
router.patch('/edit/:id', authentication, App.changeStatus)
router.delete('/apps/:id', authentication,  App.delete)



module.exports =router