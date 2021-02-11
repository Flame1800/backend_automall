`use strict`

const responce = require('./../responce')
const db = require('./../settings/db')

exports.users = (req, res) => {

    db.query('SELECT * FROM `users`', (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            
        }
    })

    responce.status(users, res)
}