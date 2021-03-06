const router = require ('express').Router()
const confirmPassword = require ('../middlewares/confirm_pass')
const UserController = require ('../controllers/users')
const App = require('../controllers/app')
const authentication = require('../middlewares/authentication')
const ThirdParty = require('../controllers/thirdParty')

router.post('/apps', App.create)
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
router.get('/location', ThirdParty.location)
router.get('/weather', ThirdParty.weather)
router.get('/random', ThirdParty.random)


module.exports =router
