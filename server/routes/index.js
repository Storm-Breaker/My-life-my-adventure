const router = require ('express').Router()
const confirmPassword = require ('../middlewares/confirm_pass')
const UserController = require ('../controllers/users')
const App = require('../controllers/app')
const authentication = require('../middlewares/authentication')

router.post('/apps', App.create)
router.delete('/apps/:id', authentication,  App.delete)
router.get('/apps/:id', authentication, App.getEdit)
router.post('/register', confirmPassword, UserController.register)
router.post('/login', UserController.login)
router.put('/edit/:id', authentication, App.editAll)
router.patch('/edit/:id', authentication, App.changeStatus)



module.exports =router