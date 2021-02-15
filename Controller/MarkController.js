`use strict`

const response = require('../response')

const { Car_mark } = require('../models')
const { Car_model } = require('../models')


exports.index = async (req, res) => {
    try {
        const marks = await Car_mark.findAll({ raw: true })

        const normalizedMarks = marks.map(async mark => {
            mark.mark = mark.title
            delete mark.title

            const models = await Car_model.findAll({ where: { mark_id: mark.id } })
            return { ...mark, models }
        })

        const responseMarks = []
        for (i = 0; i < normalizedMarks.length; i++) {
            const mark = await normalizedMarks[i]
            responseMarks.push(mark)
        }

        response.status(200, responseMarks, res)

    } catch (error) {
        console.log(error)
        res.send('Ошибка')
    }
}
