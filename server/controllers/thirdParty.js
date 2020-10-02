const { response } = require("express")
const axios = require('axios')

class ThirdParty{

    static location(req, res, next){

        axios({
            method: 'get',
            url: `https://developers.zomato.com/api/v2.1/search?q=${req.query.location}`,
            headers: {
                "user-key": process.env.USER_KEY
            },
            responseType: 'json',
                
        })
        .then(function(response){
            if (response.data.results_found == 0){
                throw{
                    name: 'not found'
                }
            }
            res.status(response.status).json(response.data.restaurants[0].restaurant.location.address)
        })
        .catch(err =>{
            next(err)
        })       
    }

    static weather(req, res, next){
        axios({
            method: "get",
            url: `http://api.weatherstack.com/current?access_key=${process.env.ACCESS_KEY}&query=${req.query.location}`
        })
        .then(response => {
            if (response.data.success == false){
                throw{
                    name: 'not found'
                }
            }
            res.status(response.status).json(response.data.current.weather_descriptions[0])
        })
        .catch(err => {
            next(err)
        })
    }


    static random(req, res, next){
        axios({
            method: "get",
            url: `https://www.boredapi.com/api/activity?type=recreational`,
            responseType: 'json'
        })
        .then(function(response){
            res.status(response.status).json(response.data.activity)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ThirdParty