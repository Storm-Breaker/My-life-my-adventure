const {Todo} = require('../models')

class App{
    static async create(req, res, next){
        const {title, location, due_date, weather, status} = req.body
        try {

            const apps = await Todo.create({
                title, location, due_date, weather, status
            })
            res.status(201).json({apps})

        }catch(error){
            next(error)
        }
    }
    
    static async fetch (req,res, next){
        try {
            const todo = await Todo.findAll({
                where: { UserId: req.params.id },
                order: [[`id`, `ASC`]]
            })
            res.status(200).json({ todo })
        }
        catch (err) {
            next(err)
        }
    }

   static async editAll (req, res, next){
       const id = req.params.id
        try {
            const todo = await Todo.update ({
                title : req.body.title,
                location: req.body.location,
                due_date: req.body.due_date,
                weather: req.body.weather,
                status: req.body.status
            }, {where : {id}})
            console.log(todo)
            res.status(200).json({todo})
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
        }catch(error){
            next(err)
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

module.exports = App

