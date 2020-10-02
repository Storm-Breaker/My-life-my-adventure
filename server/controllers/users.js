const { User } = require ('../models')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

    static googleSignIn(req, res, next) {
        console.log(`End Point Sign`)
        const id_token = req.headers.id_token
        let email
        client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID
        })
        .then(ticket=>{
            const payload = ticket.getPayload()
            email = payload.email
            // console.log(email)
            return User.findOne({
                where : {
                    email
                }
            })
           
        })
        .then(user=>{
            console.log(user)
            if(!user){
                return User.create({
                    email,
                    password : SECRET_PASSWORD
                })
            }
            else {
               return user
            }
        })
        .then(user =>{
            const payload = { id: user.id, email:user.email }
            const jwtToken = generateToken(payload)
            return res.status(200).json({
                token: jwtToken
            })
        })
        .catch(err=>[
            next(err)
        ])
    }

}

module.exports = UserController