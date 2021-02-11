`use strict`

const responce = require('../responce')

exports.index = (req, res) => {
    responce.status('Hello REST API NODEJS', res)
}