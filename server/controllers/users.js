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

    static async login (req, res, next) {
        const {email, password} = req.body
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (user === null){
                throw {
                    name: `wrong email/password`
                }
            }

            const correctPassword = bcryptjs.compareSync(password, user.password)
            if (correctPassword){
                const accessToken = jwt.sign({
                    email : user.email,
                    id : user.id,
                }, process.env.JWT_SECRET)
                res.status(200).json ({
                    accessToken
                })
            }
            else {
                throw {
                    name : `wrong email/password`
                }
            }

        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController