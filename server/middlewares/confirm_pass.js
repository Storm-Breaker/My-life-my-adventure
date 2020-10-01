function confirmPassword (req, res, next){
    const data = req.body
    if (data.password === data.confirm_password){
        next()
    }
    else {
        throw {
            name: `your confimartion password is not match`
        }
    }
}

module.exports = confirmPassword