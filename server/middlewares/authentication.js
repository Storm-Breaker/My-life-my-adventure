const jwt = require ('jsonwebtoken')
const { User } = require ('../models')

function authentication (req, res, next){
    console.log(`okokokokokko`)
    const currentToken = req.headers.access_token
    const decoded = jwt.verify(currentToken, process.env.JWT_SECRET, (err, decoded) =>{
        if (err){
            next({
                name: `unauthorized user`
            })
        }
        else {
            User
            .findByPk(decoded.id)
            .then(todo => {
                if (todo){
                    req.decodedUser = decoded
                    next ()
                }
                else {
                    throw {
                        name : `unauthorized user`
                    }
                }
            })
            .catch (err => {
                nexr(err)
            })
        }

    })
}

module.exports = authentication