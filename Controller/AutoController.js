`use strict`

const response = require('../response')

const { Car } = require('../models')
const { Car_mark } = require('../models')
const { Car_model } = require('../models')


exports.index = async (req, res) => {
    try {
    
    } catch (error) {
        console.log(error)
        res.send('Ошибка')
    }
}



exports.update = async (req, res) => {
    try {
        await Car.update({
            ...req.query
        }, {
            where: {
                id: req.params['id']
            }
        })
        const car = await Car.findByPk(req.params['id'])

        if (car) {
            return response.status(200, car, res)
        }
        return response.error(200, "Некорректно заполненны поля", res)

    } catch (err) {
        console.log(err)
        response.error(500, 'Connection error', res)
    }
}


exports.add = async (req, res) => {
    try {
        const car = await Car.create({
           ...req.query, user_id: req.params['id']
        })
        response.status(200, car, res)
    } catch (err) {
        console.log(err)
        response.error(500, 'Connection error', res)
    }
}