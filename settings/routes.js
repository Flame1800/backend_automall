`use strict`

module.exports = (app) => {
    const indexController = require('../Controller/IndexController')
    const userController = require('../Controller/UserController')

    app.route('/').get(indexController.index)
    app.route('/api/users').get(userController.users)
}