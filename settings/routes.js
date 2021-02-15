`use strict`

module.exports = (app) => {
    const indexController = require('../Controller/IndexController')
    const userController = require('../Controller/UserController')

    app.route('/').get(indexController.index)
    app.route('/users').get(userController.users)
    app.route('/user/add').post(userController.add)

    app.route('/user/auth').post(userController.sendCode)
    app.route('/user/login').post(userController.login)
    app.route('/user/:id').get(userController.find)
    app.route('/user/:id').put(userController.update)
}