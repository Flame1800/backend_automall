`use strict`

const axios = require('axios')
const response = require('../response')
const {
    User
} = require('../models')
const {
    Car
} = require('../models')
const {
    Car_mark
} = require('../models')
const {
    Car_model
} = require('../models')

let currentUserCode = ''

const normalizeCar = async (car) => {
    const model = await Car_model.findByPk(car.model_id)
    const mark = await Car_mark.findByPk(model.mark_id)
    delete car.model_id
    delete car.user_id

    return {
        ...car,
        mark: mark.title,
        model: model.title
    }
}

exports.users = async (req, res) => {
    try {
        const users = await User.findAll()
        response.status(200, users, res)
    } catch (err) {
        response.error(500, 'Connection error', res)
    }
}



exports.find = async (req, res) => {
    try {
        const user = await User.findByPk(req.params['id'])
        if (user) {
            const cars = await Car.findAll({
                where: {
                    user_id: req.params['id']
                },
                raw: true
            })
            const normalizedCars = cars.map((car) => {
                const newCar = normalizeCar(car)
                return newCar
            })
            const responseCars = []
            for (i = 0; i < normalizedCars.length; i++) {
                const car = await normalizedCars[i]
                responseCars.push(car)
            }

            const result = {
                ...user.dataValues,
                auto: responseCars
            }
            return response.status(200, {
                user: result
            }, res)
        }

    } catch (err) {
        response.error(500, 'Connection error', res)
        throw err;
    }
}

exports.update = async (req, res) => {
    try {
        await User.update({
            ...req.query
        }, {
            where: {
                id: req.params['id']
            }
        })
        const user = await User.findByPk(req.params['id'])

        if (user) {
            return response.status(200, user, res)
        }
        return response.error(200, "Некорректно заполненны поля", res)

    } catch (err) {
        console.log(err)
        response.error(500, 'Connection error', res)
    }
}

exports.add = async (req, res) => {
    try {
        const users = await User.create({
            phone: req.query.phone
        })
        response.status(200, users, res)
    } catch (err) {
        response.error(500, 'Connection error', res)
    }
}

exports.sendCode = async (req, res) => {
    try {
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

            // const url = `https://smscentre.com/sys/send.php?login=flame1800&psw=password&phones=${req.query.phone}&mes=code&call=1&fmt=3`

            // const resCode = await axios.get(url)
            // currentUserCode = resCode.data.code
// ddde6778949811e8a35c902b34336e2c

            return response.status(200, {
                code: currentUserCode
            }, res)
        }
    } catch (err) {
        console.log(err)
        response.error(500, 'Connection error', res)
    }
}

exports.login = async (req, res) => {
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
            } else {
                response.error(401, 'Неверный код', res)

            }
        }
    } catch (err) {
        console.log(err)
        response.error(500, 'Connection error', res)
    }
}