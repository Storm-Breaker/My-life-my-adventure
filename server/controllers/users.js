const { User } = require ('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    static async register (req, res, next){
        console.log(req.body)
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
        console.log(req.body)
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
                const access_token = jwt.sign({
                    email : user.email,
                    id : user.id,
                }, process.env.JWT_SECRET)
                res.status(200).json ({
                    access_token
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

    static async getUser (req, res, next){
        const id = req.decodedUser.id
        try {
            const user = await User.findByPk(id)
                res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async editProfile (req, res, next){
        console.log(req.body)
        try {
            const user = await User.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate
            }, {where: {id : req.decodedUser.id}})
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController