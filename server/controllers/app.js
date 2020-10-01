const {Todo} = require('../models')

class App{
    static async create(req, res, next){
        const {title, location, due_date, weather} = req.body
        try {

            const apps = await Todo.create({
                title, location, due_date, weather
            })
            res.status(201).json({apps})
            
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next){
        const id = req.params.id    

        try {
            const  apps = await Todo.destroy({
                where: {id}
            })
            if (apps === 1){
                res.status(200).json({
                    name: 'delete success'
                })
            }
            else{
                throw {
                    name: 'not found'
                }
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = App