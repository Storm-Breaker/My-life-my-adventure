const {Todo} = require ('../models')

class TodoController {
    static async editAll (req, res, next){
        try {
            const todo = await Todo.update ({
                title : req.body.title,
                location: req.body.location,
                due_date: req.body.due_date,
                weather: req.body.weather,
                status: req.body.status
            }, {where : {id : id}})
            res.status(200).json({todo})
        } catch (error) {
            next(error)
        }
    }

    static async changeStatus (req, res, next) {
        try {
            const todo = await Todo.update({
                status : req.body.status
            })
            res.status(200).json({todo})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TodoController