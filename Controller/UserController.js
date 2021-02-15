`use strict`

const response = require('../response')
const { User } = require('../models')
const { Car } = require('../models')
const { Mark } = require('../models')
const { Model } = require('../models')

let currentUserCode = ''

exports.users = async(req, res) => {
    try {
        const users = await User.findAll()
        response.status(200, users, res)
    } catch (err) {
        response.error(500, 'Connection error', res)
    }
}

exports.find = async(req, res) => {
    try {
        const user = await User.findByPk(req.params['id'])
        if (user) {
            const cars = await Car.findAll({ where: { user_id: req.params['id'] }, raw: true })
            
            const normalizedCars = cars.map(async (car) => {
                const model = await Model.findByPk(car.model_id)
                const mark = await Mark.findByPk(car.mark_id)   09ш
                delete car[model_id]
                delete car[mark_id]
                
                return {
                    ...car,
                    model,
                    mark
                }
            })

            const result = {...user.dataValues, auto: normalizedCars}
            return response.status(200, {user: result}, res)
        }

    } catch (err) {
        response.error(500, 'Connection error', res)
        throw err;
    }
}

exports.update = async(req, res) => {
    try {
        const user = await User.update(req.params['id'])
        if (user) {
            return response.status(200, user, res)
        }

    } catch (err) {
        console.log(err)
        response.error(500, 'Connection error', res)
    }
}



exports.add = async(req, res) => {
    try {
        const users = await User.create({
            phone: req.query.phone
        })
        response.status(200, users, res)
    } catch (err) {
        response.error(500, 'Connection error', res)
    }
}

exports.sendCode = async(req, res) => {
    // try {
    if (!req.query.phone) {
        const message = "Зполните поле телефона"
        return response.error(401, message, res)
    } else {
        function randomString(i) {
            var rnd = '';
            while (rnd.length < i)
                rnd += Math.random().toString(36).substring(2);
            return rnd.substring(0, i);
        };
        currentUserCode = randomString(5)

        return response.status(200, {
            code: currentUserCode
        }, res)
    }
    //     response.status(200, users, res)
    // } catch (err) {
    //     console.log(err)
    //     response.error(500, 'Connection error', res)
    // }
}

exports.login = async(req, res) => {
    try {
        if (!req.query.userPhone && !req.query.code) {
            const message = "Заполните все поля!"
            return response.error(401, message, res)
        } else {
            const {
                code,
                userPhone
            } = req.query

            if (code === currentUserCode) {
                const newUser = await User.create({
                    phone: userPhone
                })
                response.status(200, {
                    data: []
                }, res)
            }
            response.error(401, 'Неверный код', res)
        }
    } catch (err) {
        console.log(err)
        response.error(500, 'Connection error', res)
    }
}