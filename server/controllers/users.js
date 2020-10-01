const { User } = require ('../models')

class UserController {
    static async register (req, res, next){
        const {firstName, lastName, email, password} = req.body
        try {
            const user = await User.create ({
                firstName,
                lastName,
                email,
                password
            })
            res.status(200).json({
                user
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController