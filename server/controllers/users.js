const {OAuth2Client} = require('google-auth-library');
const { User } = require('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

const { generateToken } = require('../helpers/jwt');
const SECRET_PASSWORD = process.env.SECRET_PASSWORD


class UserController {
    static async register(req, res, next) {
        console.log(req.body)
        const { firstName, lastName, email, password } = req.body
        try {
            const user = await User.create({
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

    static async login(req, res, next) {
        console.log(req.body)
        const { email, password } = req.body
        try {
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (user === null) {
                throw {
                    name: `wrong email/password`
                }
            }

            const correctPassword = bcryptjs.compareSync(password, user.password)
            if (correctPassword) {
                const access_token = jwt.sign({
                    email: user.email,
                    id: user.id,
                }, process.env.JWT_SECRET)
                res.status(200).json({
                    access_token
                })
            }
            else {
                throw {
                    name: `wrong email/password`
                }
            }

        } catch (error) {
            next(error)
        }
    }

    static async getUser(req, res, next) {
        const id = req.decodedUser.id
        try {
            const user = await User.findByPk(id)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async editProfile(req, res, next) {
        console.log(req.body)
        try {
            const user = await User.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate
            }, { where: { id: req.decodedUser.id } })
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }

    static async googleSignIn(req, res, next) {
        console.log(`End Point Sign`)
        const id_token = req.headers.id_token
        let email
        client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                email = payload.email
                // console.log(email)
                return User.findOne({
                    where: {
                        email
                    }
                })

            })
            .then(user => {
                console.log(user)
                if (!user) {
                    return User.create({
                        email,
                        password: SECRET_PASSWORD
                    })
                }
                else {
                    return user
                }
            })
            .then(user => {
                const payload = { id: user.id, email: user.email }
                const jwtToken = generateToken(payload)
                return res.status(200).json({
                    token: jwtToken
                })
            })
            .catch(err => [
                next(err)
            ])

    }

}

module.exports = UserController